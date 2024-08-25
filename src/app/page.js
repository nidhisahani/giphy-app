import Navbar from "./components/navbar";
import SearchBar from "./gifSearch";

export default function Home() {

  return (
    <div className="bg-grey-600">
      <Navbar />
      <SearchBar />
    </div>
  );
}
