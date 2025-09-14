import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Drivers from "./pages/Drivers";
import Dispatch from "./pages/Dispatch";
import Vehicles from "./pages/Vehicles";
import Customers from "./pages/Customers";
import Pricing from "./pages/Pricing";
import Invoicing from "./pages/Invoicing";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";
import FleetDriver from "./pages/FleetDriver";
import FleetVehicle from "./pages/FleetVehicle";
import OwnerDriver from "./pages/OwnerDriver";
import SubcontractorDriver from "./pages/SubcontractorDriver";
import CorporateAccountSummary from "./pages/CorporateAccountSummary";
import PersonalAccountSummary from "./pages/PersonalAccountSummary";
import SubContractorAccountSummary from "./pages/SubContractorAccountSummary";
import SalesmanSummary from "./pages/SalesmanSummary";
import FinanceReport from "./pages/FinanceReport";
import SharedPlatform from "./pages/SharedPlatform";
import ClearedBooking from "./pages/ClearedBooking";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/cleared-bookings" element={<ClearedBooking />} />

            <Route path="/drivers" element={<Drivers />} />
            <Route path="/drivers/fleet" element={<FleetDriver />} />
            <Route path="/drivers/fleet-vehicle" element={<FleetVehicle />} />
            <Route path="/drivers/owner" element={<OwnerDriver />} />
            <Route path="/drivers/subcontractor" element={<SubcontractorDriver />} />
            <Route path="/clients/corporate" element={<CorporateAccountSummary />} />
            <Route path="/clients/individual" element={<PersonalAccountSummary />} />
            <Route path="/clients/subcontractor" element={<SubContractorAccountSummary />} />
            <Route path="/crm/salesman-summary" element={<SalesmanSummary />} />
            <Route path="/dispatch" element={<Dispatch />} />
            <Route path="/shared-platform" element={<SharedPlatform />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/finance/report" element={<FinanceReport />} />
            <Route path="/finance/invoice-summary" element={<Invoicing />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/communications" element={<div className="p-8 text-center text-muted-foreground">Communications module coming soon...</div>} />
            <Route path="/settings" element={<div className="p-8 text-center text-muted-foreground">Settings coming soon...</div>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
