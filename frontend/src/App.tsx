import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
// import Dashboard from "./pages/Dashboard";
import Dashboard from "./pages/Summary";
import Bookings from "./pages/NewBooking";
import Drivers from "./pages/Drivers";

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
import ArchivedInvoices from "./pages/ArchivedInvoices";
import GenerateInvoice from "./pages/GenerateInvoice";
import PaymentLinkSummary from "./pages/PaymentLinkSummary";
import DriverPaymentSummary from "./pages/DriverPaymentSummary";
import RefundSummary from "./pages/RefundSummary";
import AffiliateList from "./pages/AffiliateList";
import TFLReportSummary from "./pages/TFLReportSummary";
import ServiceFailureRecords from "./pages/ServiceFailureRecords";
import ComplainRecords from "./pages/ComplainRecords";
import LostPropertyFound from "./pages/LostPropertyFound";
import TFLStaffRegistered from "./pages/TFLStaffRegistered";
import LondonTFLWeeklyReport from "./pages/LondonTFLWeeklyReport";
import Map from "./pages/DriverTrackingMap";
import Setting from "./pages/Setting";
import Profile from "./pages/Profile";
// Create a client
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
            <Route path="/map" element={<Map />} />
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
           
            <Route path="/shared-platform" element={<SharedPlatform />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/finance/report" element={<FinanceReport />} />
            <Route path="/finance/invoice-summary" element={<Invoicing />} />
            <Route path="/finance/archived" element={<ArchivedInvoices />} />
            <Route path="/finance/generate" element={<GenerateInvoice />} />
            <Route path="/finance/payment-link" element={<PaymentLinkSummary />} />
            <Route path="/finance/driver-payment" element={<DriverPaymentSummary  />} />
            <Route path="/compliance/tfl-report" element={<TFLReportSummary  />} />
              <Route path="/compliance/service-failure" element={<ServiceFailureRecords  />} />
              <Route path="/compliance/complaints" element={<ComplainRecords  />} />
               <Route path="/compliance/lost-property" element={<LostPropertyFound  />} />
               <Route path="/compliance/tfl-staff" element={<TFLStaffRegistered />} />
               <Route path="/compliance/london-tfl-weekly" element={<LondonTFLWeeklyReport />} />
            <Route path="/finance/refunds" element={<RefundSummary  />} />
            <Route path="/affiliate/list" element={<AffiliateList />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/profile" element={<Profile />} />
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
