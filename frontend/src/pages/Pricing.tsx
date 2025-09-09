import React from 'react';
import { 
  DollarSign, 
  Clock, 
  MapPin, 
  Settings,
  TrendingUp,
  Calculator,
  Save,
  RefreshCw,
  Plus,
  Minus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Label } from '@/components/ui/label';

// Mock pricing data
const pricingRules = [
  {
    id: '1',
    name: 'Standard Rate',
    type: 'point-to-point',
    baseRate: 3.50,
    perKm: 1.25,
    perMinute: 0.35,
    surgePricing: false,
    active: true,
  },
  {
    id: '2', 
    name: 'Hourly Standard',
    type: 'hourly',
    baseRate: 25.00,
    perHour: 35.00,
    waitingTime: 0.50,
    surgePricing: false,
    active: true,
  },
  {
    id: '3',
    name: 'Full Day Rate',
    type: 'full-day',
    baseRate: 150.00,
    maxHours: 8,
    extraHour: 25.00,
    surgePricing: false,
    active: true,
  },
];

const surgeZones = [
  { name: 'Downtown', multiplier: 1.5, active: true },
  { name: 'Airport', multiplier: 2.0, active: true },
  { name: 'Business District', multiplier: 1.3, active: false },
  { name: 'University Area', multiplier: 1.2, active: true },
];

const Pricing = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Pricing & Rating Engine</h1>
          <p className="text-muted-foreground">Configure dynamic pricing rules and rate structures</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Calculator className="h-4 w-4" />
            Price Calculator
          </Button>
          <Button className="gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Trip Value</p>
                <p className="text-2xl font-bold">$42.50</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-success/10 rounded-lg">
                <TrendingUp className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Revenue/Hour</p>
                <p className="text-2xl font-bold">$156</p>
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
                <p className="text-sm text-muted-foreground">Surge Active</p>
                <p className="text-2xl font-bold">2</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-accent/10 rounded-lg">
                <Settings className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Rules</p>
                <p className="text-2xl font-bold">{pricingRules.filter(r => r.active).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pricing Rules */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Pricing Rules</CardTitle>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Rule
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rule Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Base Rate</TableHead>
                  <TableHead>Variable Rate</TableHead>
                  <TableHead>Surge Pricing</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pricingRules.map((rule) => (
                  <TableRow key={rule.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{rule.name}</p>
                        <p className="text-sm text-muted-foreground">ID: {rule.id}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {rule.type.replace('-', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{formatCurrency(rule.baseRate)}</span>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {rule.type === 'point-to-point' && (
                          <>
                            <p>{formatCurrency(rule.perKm!)}/km</p>
                            <p className="text-muted-foreground">{formatCurrency(rule.perMinute!)}/min</p>
                          </>
                        )}
                        {rule.type === 'hourly' && (
                          <>
                            <p>{formatCurrency(rule.perHour!)}/hr</p>
                            <p className="text-muted-foreground">{formatCurrency(rule.waitingTime!)}/min wait</p>
                          </>
                        )}
                        {rule.type === 'full-day' && (
                          <>
                            <p>{rule.maxHours} hrs max</p>
                            <p className="text-muted-foreground">{formatCurrency(rule.extraHour!)}/extra hr</p>
                          </>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {rule.surgePricing ? (
                        <Badge className="bg-warning text-warning-foreground">Enabled</Badge>
                      ) : (
                        <Badge variant="secondary">Disabled</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {rule.active ? (
                        <Badge className="bg-success text-success-foreground">Active</Badge>
                      ) : (
                        <Badge variant="destructive">Inactive</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost">Edit</Button>
                        <Button size="sm" variant="ghost">
                          {rule.active ? <Minus className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Configuration Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Surge Pricing */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-warning" />
              Surge Pricing Zones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {surgeZones.map((zone, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-primary" />
                    <div>
                      <p className="font-medium">{zone.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {zone.multiplier}x multiplier
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {zone.active ? (
                      <Badge className="bg-warning text-warning-foreground">Active</Badge>
                    ) : (
                      <Badge variant="secondary">Inactive</Badge>
                    )}
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full gap-2">
                <Plus className="h-4 w-4" />
                Add Surge Zone
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Price Calculator */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-accent" />
              Rate Calculator
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="distance">Distance (km)</Label>
                  <Input id="distance" placeholder="10.5" />
                </div>
                <div>
                  <Label htmlFor="duration">Duration (min)</Label>
                  <Input id="duration" placeholder="25" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="service-type">Service Type</Label>
                <select className="w-full p-2 border border-border rounded-md bg-background">
                  <option>Point to Point</option>
                  <option>Hourly Rental</option>
                  <option>Full Day</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="surge" className="rounded" />
                <Label htmlFor="surge">Apply surge pricing (1.5x)</Label>
              </div>

              <div className="border-t border-border pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Base Rate:</span>
                  <span className="font-medium">$3.50</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Distance (10.5km × $1.25):</span>
                  <span className="font-medium">$13.13</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Time (25min × $0.35):</span>
                  <span className="font-medium">$8.75</span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold border-t border-border pt-2">
                  <span>Total:</span>
                  <span>$25.38</span>
                </div>
              </div>

              <Button className="w-full gap-2">
                <RefreshCw className="h-4 w-4" />
                Recalculate
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Pricing;