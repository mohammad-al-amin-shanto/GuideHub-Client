import HeroSearch from "../components/HeroSearch";
import FeaturedCities from "../components/FeaturedCities";
import TopGuides from "../components/TopGuides";
import HowItWorks from "../components/HowItWorks";
import Categories from "../components/Categories";
import Testimonials from "../components/Testimonials";

export default function Home() {
  return (
    <div className="space-y-8">
      <section id="hero" className="pt-12">
        <HeroSearch />
      </section>

      <section id="how" className="container mx-auto px-4">
        <HowItWorks />
      </section>

      <section id="featured" className="container mx-auto px-4">
        <FeaturedCities />
      </section>

      <section id="categories" className="container mx-auto px-4">
        <Categories />
      </section>

      <section id="top-guides" className="container mx-auto px-4">
        <TopGuides />
      </section>

      <section id="testimonials" className="container mx-auto px-4 pb-12">
        <Testimonials />
      </section>
    </div>
  );
}
