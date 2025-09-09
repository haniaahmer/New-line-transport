import React from 'react';
import { 
  FileText, 
  DollarSign, 
  Send, 
  Download,
  Eye,
  Calendar,
  CreditCard,
  TrendingUp,
  Plus,
  Filter,
  Search,
  MoreHorizontal,
  CheckCircle,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// Mock invoice data
const invoices = [
  {
    id: 'INV-001',
    invoiceDate: '2024-01-15',
    sendDate: '2024-01-16',
    approved: true,
    customerName: 'TechCorp Inc.',
    period: 'Jan 2024',
    net: 2500.00,
    vat: 340.50,
    gross: 2840.50,
    cardCharge: 20.00,
    paidAmount: 2840.50,
    totalDue: 0.00,
    dueDate: '2024-02-15',
    paidDate: '2024-01-20',
    status: 'paid',
    notes: 'Payment received',
  },
  {
    id: 'INV-002',
    invoiceDate: '2024-01-12',
    sendDate: '2024-01-13',
    approved: false,
    customerName: 'Sarah Johnson',
    period: 'Jan 2024',
    net: 137.50,
    vat: 19.25,
    gross: 156.75,
    cardCharge: 0.00,
    paidAmount: 0.00,
    totalDue: 156.75,
    dueDate: '2024-02-12',
    paidDate: null,
    status: 'pending',
    notes: 'Awaiting payment',
  },
  {
    id: 'INV-003',
    invoiceDate: '2023-12-15',
    sendDate: '2023-12-16',
    approved: true,
    customerName: 'Global Logistics Ltd.',
    period: 'Dec 2023',
    net: 3750.00,
    vat: 500.00,
    gross: 4250.00,
    cardCharge: 25.00,
    paidAmount: 0.00,
    totalDue: 4250.00,
    dueDate: '2024-01-15',
    paidDate: null,
    status: 'overdue',
    notes: 'Follow-up required',
  },
];

const Invoicing = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-success text-success-foreground';
      case 'pending': return 'bg-warning text-warning-foreground';
      case 'overdue': return 'bg-destructive text-destructive-foreground';
      case 'draft': return 'bg-muted text-muted-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const totalRevenue = invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.gross, 0);
  const pendingAmount = invoices.filter(inv => inv.status === 'pending').reduce((sum, inv) => sum + inv.totalDue, 0);
  const overdueAmount = invoices.filter(inv => inv.status === 'overdue').reduce((sum, inv) => sum + inv.totalDue, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Invoicing & Payments</h1>
          <p className="text-muted-foreground">Manage billing cycles, statements, and payment processing</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export to QuickBooks
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create Invoice
          </Button>
        </div>
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-success/10 rounded-lg">
                <CheckCircle className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Paid This Month</p>
                <p className="text-2xl font-bold">{formatCurrency(totalRevenue)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-warning/10 rounded-lg">
                <Clock className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Payment</p>
                <p className="text-2xl font-bold">{formatCurrency(pendingAmount)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-destructive/10 rounded-lg">
                <TrendingUp className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Overdue Amount</p>
                <p className="text-2xl font-bold">{formatCurrency(overdueAmount)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Invoices</p>
                <p className="text-2xl font-bold">{invoices.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invoices Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search"
                  className="pl-10"
                />
              </div>
            </div>
            <Input placeholder="Choose From" className="max-w-xs" />
            <Input placeholder="Choose To" className="max-w-xs" />
            <Input placeholder="SEPTEMBER 2025" className="max-w-xs" />
            <Input placeholder="Please Select Client" className="max-w-xs" />
            <Input placeholder="Please Select Status" className="max-w-xs" />
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              EXPORT CSV
            </Button>
          </div>

          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Invoice Date</TableHead>
                  <TableHead>Send Date</TableHead>
                  <TableHead>Approved?</TableHead>
                  <TableHead>Client Name</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Net</TableHead>
                  <TableHead>Vat</TableHead>
                  <TableHead>Gross</TableHead>
                  <TableHead>Card Charge</TableHead>
                  <TableHead>Paid Amount</TableHead>
                  <TableHead>Total Due</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Paid Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>NOTES</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell>
                      <span className="font-mono font-medium">{invoice.id}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{new Date(invoice.invoiceDate).toLocaleDateString()}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{new Date(invoice.sendDate).toLocaleDateString()}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{invoice.approved ? 'Yes' : 'No'}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          {invoice.customerName.includes('Inc.') || invoice.customerName.includes('Ltd.') ? (
                            <FileText className="h-4 w-4 text-primary" />
                          ) : (
                            <span className="text-xs font-medium text-primary">
                              {invoice.customerName.split(' ').map(n => n[0]).join('')}
                            </span>
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{invoice.customerName}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{invoice.period}</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold">{formatCurrency(invoice.net)}</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold">{formatCurrency(invoice.vat)}</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold">{formatCurrency(invoice.gross)}</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold">{formatCurrency(invoice.cardCharge)}</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold">{formatCurrency(invoice.paidAmount)}</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold">{formatCurrency(invoice.totalDue)}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{new Date(invoice.dueDate).toLocaleDateString()}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{invoice.paidDate ? new Date(invoice.paidDate).toLocaleDateString() : '-'}</span>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(invoice.status)}>
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{invoice.notes}</span>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="gap-2">
                            <Eye className="h-4 w-4" />
                            View Invoice
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Download className="h-4 w-4" />
                            Download PDF
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Send className="h-4 w-4" />
                            Send to Customer
                          </DropdownMenuItem>
                          {invoice.status === 'pending' && (
                            <DropdownMenuItem className="gap-2">
                              <CreditCard className="h-4 w-4" />
                              Record Payment
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Payment Processing & Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-accent" />
              Payment Processing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div>
                  <p className="font-medium">Credit Card Payments</p>
                  <p className="text-sm text-muted-foreground">Stripe Integration</p>
                </div>
                <Badge className="bg-success text-success-foreground">Active</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div>
                  <p className="font-medium">Bank Transfers</p>
                  <p className="text-sm text-muted-foreground">ACH & Wire</p>
                </div>
                <Badge className="bg-success text-success-foreground">Active</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div>
                  <p className="font-medium">Corporate Accounts</p>
                  <p className="text-sm text-muted-foreground">Net 30 Terms</p>
                </div>
                <Badge className="bg-success text-success-foreground">Active</Badge>
              </div>

              <Button className="w-full gap-2">
                <Plus className="h-4 w-4" />
                Add Payment Method
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5 text-primary" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full gap-2 justify-start">
                <FileText className="h-4 w-4" />
                Generate Monthly Statement
              </Button>
              
              <Button variant="outline" className="w-full gap-2 justify-start">
                <Download className="h-4 w-4" />
                Export to QuickBooks
              </Button>
              
              <Button variant="outline" className="w-full gap-2 justify-start">
                <Send className="h-4 w-4" />
                Send Payment Reminders
              </Button>
              
              <Button variant="outline" className="w-full gap-2 justify-start">
                <TrendingUp className="h-4 w-4" />
                Revenue Report
              </Button>
              
              <Button variant="outline" className="w-full gap-2 justify-start">
                <Calendar className="h-4 w-4" />
                Aging Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Invoicing;