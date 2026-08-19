import { useRouter } from '@/lib/router';
import { BookingProvider } from '@/lib/bookingContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import Attractions from '@/pages/Attractions';
import AttractionDetail from '@/pages/AttractionDetail';
import Packages from '@/pages/Packages';
import PackageDetail from '@/pages/PackageDetail';
import Customize from '@/pages/Customize';
import Booking from '@/pages/Booking';
import Payment from '@/pages/Payment';
import Gallery from '@/pages/Gallery';
import SafariInfo from '@/pages/SafariInfo';
import About from '@/pages/About';
import Contact from '@/pages/Contact';

function App() {
  const { route, navigate } = useRouter();

  return (
    <BookingProvider>
      <div className="flex min-h-screen flex-col">
        <Navbar route={route} navigate={navigate} />
        <main className="flex-1">
          {route.name === 'home' && <Home navigate={navigate} />}
          {route.name === 'attractions' && <Attractions navigate={navigate} />}
          {route.name === 'attraction' && <AttractionDetail slug={route.slug} navigate={navigate} />}
          {route.name === 'packages' && <Packages navigate={navigate} />}
          {route.name === 'package' && <PackageDetail slug={route.slug} navigate={navigate} />}
          {route.name === 'customize' && <Customize navigate={navigate} />}
          {route.name === 'booking' && <Booking refParam={route.ref} navigate={navigate} />}
          {route.name === 'payment' && <Payment ref={route.ref} navigate={navigate} />}
          {route.name === 'gallery' && <Gallery navigate={navigate} />}
          {route.name === 'safari-info' && <SafariInfo navigate={navigate} />}
          {route.name === 'about' && <About navigate={navigate} />}
          {route.name === 'contact' && <Contact navigate={navigate} />}
        </main>
        <Footer navigate={navigate} />
      </div>
    </BookingProvider>
  );
}

export default App;
