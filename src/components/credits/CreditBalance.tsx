import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { DollarSign, TrendingUp, TrendingDown, Clock } from "lucide-react";

interface CreditTransaction {
  id: string;
  amount: number;
  type:
    | "purchase"
    | "booking_reserve"
    | "booking_complete"
    | "booking_refund"
    | "tutor_payout";
  description?: string;
  created_at: string;
}

export default function CreditBalance() {
  const { profile, user } = useAuth();
  const [transactions, setTransactions] = useState<CreditTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile?.id) {
      fetchTransactions();
    }
  }, [profile?.id]);

  const fetchTransactions = async () => {
    if (!profile?.id) return;

    try {
      const { data, error } = await supabase
        .from("credit_transactions")
        .select("*")
        .eq("user_id", profile.id)
        .order("created_at", { ascending: false })
        .limit(10);

      if (error) {
        console.error("Error fetching transactions:", error);
        return;
      }

      setTransactions(data || []);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "purchase":
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "booking_reserve":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "booking_complete":
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      case "booking_refund":
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      default:
        return <DollarSign className="h-4 w-4" />;
    }
  };

  const getTransactionColor = (type: string, amount: number) => {
    if (type === "purchase" || type === "booking_refund") {
      return "text-green-600";
    }
    if (type === "booking_reserve" || type === "booking_complete") {
      return "text-red-600";
    }
    return amount > 0 ? "text-green-600" : "text-red-600";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (profile?.role !== "student") {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Current Balance Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Credit Balance
          </CardTitle>
          <CardDescription>
            Your current credit balance and recent transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-primary">
                {profile.available_credits || 0}
              </div>
              <div className="text-sm text-muted-foreground">
                Available Credits
              </div>
            </div>
            <Badge variant="secondary" className="text-lg px-3 py-1">
              {(profile.available_credits || 0) * 30} minutes
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your last 10 credit transactions</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center space-x-4 animate-pulse"
                >
                  <div className="h-4 w-4 bg-muted rounded"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                  </div>
                  <div className="h-4 bg-muted rounded w-16"></div>
                </div>
              ))}
            </div>
          ) : transactions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No transactions yet</p>
              <p className="text-sm">
                Your credit transactions will appear here
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center space-x-4 py-2"
                >
                  {getTransactionIcon(transaction.type)}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">
                      {transaction.description ||
                        transaction.type.replace("_", " ")}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatDate(transaction.created_at)}
                    </div>
                  </div>
                  <div
                    className={`font-medium ${getTransactionColor(
                      transaction.type,
                      transaction.amount
                    )}`}
                  >
                    {transaction.amount > 0 ? "+" : ""}
                    {transaction.amount}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}


