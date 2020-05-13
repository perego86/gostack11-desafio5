import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}


class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    
    const incomeTotal = this.transactions.reduce((total, currentValue)=> total + (currentValue.type ==='income'?currentValue.value:0),0);
    const outcomeTotal = this.transactions.reduce((total, currentValue)=> total + (currentValue.type ==='outcome'?currentValue.value:0),0);

    return {income: incomeTotal, outcome: outcomeTotal, total: (incomeTotal - outcomeTotal)}
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title,type,value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
