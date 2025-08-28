import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface Transaction {
  id: string;
  type: 'payment' | 'refund' | 'transfer';
  amount: number;
  currency: string;
  payment_method: 'card' | 'wallet' | 'cash';
  card_last_four?: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  description?: string;
  reference_number?: string;
  created_at: string;
  updated_at: string;
}

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const { user, profile, session } = useAuth();
  const { toast } = useToast();

  const fetchTransactions = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching transactions:', error);
        toast({
          title: "Error",
          description: "Failed to load transactions",
          variant: "destructive",
        });
      } else {
        setTransactions((data || []) as Transaction[]);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const createTransaction = async (transactionData: Omit<Transaction, 'id' | 'created_at' | 'updated_at'>) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to process transactions",
        variant: "destructive",
      });
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('transactions')
        .insert([
          {
            user_id: user.id,
            ...transactionData,
            reference_number: `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
          }
        ])
        .select()
        .single();

      if (error) {
        console.error('Error creating transaction:', error);
        toast({
          title: "Transaction Failed",
          description: error.message,
          variant: "destructive",
        });
        return null;
      }

      // Update local state
      setTransactions(prev => [data as Transaction, ...prev]);
      
      // Update balance if it's a completed payment
      if (data.status === 'completed' && data.type === 'payment') {
        await updateBalance(data.amount);
      }

      toast({
        title: "Transaction Processed",
        description: `${transactionData.type === 'payment' ? 'Payment' : 'Transaction'} of $${transactionData.amount.toFixed(2)} processed successfully`,
      });

      return data;
    } catch (error) {
      console.error('Error creating transaction:', error);
      toast({
        title: "Transaction Failed",
        description: "Failed to process transaction",
        variant: "destructive",
      });
      return null;
    }
  };

  const updateBalance = async (amount: number) => {
    if (!user || !profile) return;

    try {
      const newBalance = (profile.balance || 0) + amount;
      const { error } = await supabase
        .from('profiles')
        .update({ balance: newBalance })
        .eq('user_id', user.id);

      if (error) {
        console.error('Error updating balance:', error);
      }
    } catch (error) {
      console.error('Error updating balance:', error);
    }
  };

  const processPayment = async (amount: number, paymentMethod: 'card' | 'wallet' | 'cash', description?: string, cardLastFour?: string) => {
    return await createTransaction({
      type: 'payment',
      amount,
      currency: 'USD',
      payment_method: paymentMethod,
      card_last_four: cardLastFour,
      status: 'completed', // In real app, this would start as 'pending'
      description,
    });
  };

  useEffect(() => {
    if (user && session) {
      fetchTransactions();
    }
  }, [user, session]);

  return {
    transactions,
    loading,
    fetchTransactions,
    createTransaction,
    processPayment,
  };
};