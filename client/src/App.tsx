import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import CharacterPage from "@/pages/character";
import CharacterSheetPage from "@/pages/character-sheet";
import Forge from "@/pages/forge";
import Pricing from "@/pages/pricing";
import AssetsPage from "@/pages/assets";
import Navbar from "@/components/Navbar";

function Router() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/assets" component={AssetsPage} />
        <Route path="/forge" component={Forge} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/character/:id" component={CharacterPage} />
        <Route path="/character-sheet/:characterId" component={CharacterSheetPage} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
