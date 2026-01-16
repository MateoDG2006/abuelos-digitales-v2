import { AppProvider } from "@/context/AppContext";
import { AppNavigator } from "@/components/AppNavigator";

export default function Home() {
  return (
    <AppProvider>
      <AppNavigator />
    </AppProvider>
  );
}
