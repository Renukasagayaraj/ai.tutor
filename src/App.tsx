import HeroSection from "./components/herosection";
import { useChatStore } from "./hooks/store";
import LoadingSkeleton from "./components/loadingskeleton";
import invariant from "invariant";


export const loader = async () => {
  invariant(
    import.meta.env.VITE_GOOGLE_CLIENT_ID,
    "GOOGLE_CLIENT_ID is missing"
  );

  invariant(import.meta.env.VITE_API_BASE_URL, "API_BASE_URL is missing");

  return null;
};
function App() {
  const { loading, question } = useChatStore();

  return (
    <div className="px-2 md:px-5 lg:px-20 ">
      {loading ? (
        <div className="px-2 md:px-5 lg:px-20 ">
          <LoadingSkeleton title={question} />
        </div>
      ) : (
        <HeroSection />
      )}
    </div>
  );
}

export default App;
