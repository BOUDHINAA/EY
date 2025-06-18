'use client';

import { useState, useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

// Newsletter component
function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full">
      <h3 className="text-xl font-semibold mb-2 text-[#2e2e38]">Subscribe to our newsletter</h3>
      <p className="text-sm text-gray-600 mb-4">
        Get the latest tech articles delivered straight to your inbox.
      </p>
      {subscribed ? (
        <p className="text-green-600 font-semibold">Thanks for subscribing!</p>
      ) : (
        <form onSubmit={handleSubscribe} className="flex flex-col space-y-3">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ffc72c]"
            required
          />
          <Button type="submit" className="bg-[#ffc72c] text-black hover:bg-[#fcd84f]">
            Subscribe
          </Button>
        </form>
      )}
    </div>
  );
}

type Article = {
  _id: string;
  title: string;
  date: string;
  content: string;
  thumbnail: string;
  url: string;
};

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [remainingPage, setRemainingPage] = useState(0);

  const articlesPerPage = 6;

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "snap",
    slides: {
      perView: 1,
      spacing: 30,
    },
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel);
    },
    created(s) {
      setCurrentSlide(s.track.details.rel);
    },
  });

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch("/api/articles");
        const text = await res.text();
        if (!text) return;
        const data: Article[] = JSON.parse(text);
        const sorted = data.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setArticles(sorted);
      } catch (error) {
        console.error("Failed to fetch or parse articles:", error);
      }
    }
    fetchArticles();
  }, []);

  const latestArticles = articles.slice(0, 4);
  const remainingArticles = articles.slice(4);

  const totalRemainingPages = Math.ceil(remainingArticles.length / articlesPerPage);
  const paginatedRemainingArticles = remainingArticles.slice(
    remainingPage * articlesPerPage,
    remainingPage * articlesPerPage + articlesPerPage
  );

  return (
    <div className="min-h-screen bg-[#f9f9f6] py-10 px-6 max-w-7xl mx-auto">
      <nav className="mb-8 flex items-center justify-between border-b border-gray-300 pb-4">
        <h1 className="text-4xl font-bold text-[#2e2e38]">Tech Articles</h1>
        
      </nav>

      {latestArticles.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold mb-4 text-[#2e2e38]">Latest Articles</h2>

          <div className="flex flex-col lg:flex-row gap-10 mb-16">
            {/* Carousel */}
            <div className="flex-grow min-w-0 overflow-hidden lg:w-2/3 relative">
              <button
                aria-label="Previous Slide"
                onClick={() => slider?.current?.prev()}
                className="absolute top-1/2 left-0 z-20 -translate-y-1/2 px-3 text-7xl font-bold text-[#ffc72c] hover:text-[#fcd84f] transition-colors select-none"
                style={{ background: "transparent" }}
              >
                ‹
              </button>
              <button
                aria-label="Next Slide"
                onClick={() => slider?.current?.next()}
                className="absolute top-1/2 right-0 z-20 -translate-y-1/2 px-3 text-7xl font-bold text-[#ffc72c] hover:text-[#fcd84f] transition-colors select-none"
                style={{ background: "transparent" }}
              >
                ›
              </button>

              {/* Wrapped carousel in a padded container to prevent clipping */}
              <div className="relative px-10">
                <div ref={sliderRef} className="keen-slider mb-2" style={{ overflow: "visible" }}>
                  {latestArticles.map((article, idx) => (
                    <div
                      key={article._id}
                      className={`keen-slider__slide transition-transform duration-300 ${idx === currentSlide ? "active" : ""}`}
                      style={{
                        width: "80%",
                        marginLeft: idx === 0 ? "10%" : undefined,
                        marginRight: idx === latestArticles.length - 1 ? "10%" : undefined,
                        flexShrink: 0,
                        boxSizing: "border-box",
                      }}
                    >
                      <Card className="rounded-2xl overflow-hidden shadow-md flex flex-col h-full">
                        <Image
                          src={article.thumbnail}
                          alt={article.title}
                          width={800}
                          height={400}
                          className="w-full h-64 object-cover"
                          unoptimized = {true} 
                        />
                        <CardContent className="p-6 flex flex-col flex-grow">
                          <h3 className="text-2xl font-semibold text-[#2e2e38] min-h-[3rem]">
                            {article.title}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {new Date(article.date).toLocaleDateString()}
                          </p>
                          <p className="mt-2 text-gray-700 line-clamp-4 flex-grow">
                            {article.content.slice(0, 200)}...
                          </p>
                          <Link href={article.url} target="_blank" rel="noopener noreferrer">
                            <Button className="mt-4 w-80% bg-[#ffc72c] text-black hover:bg-[#fcd84f]">
                              Read More
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>

                {/* Dots */}
                <div className="flex justify-center mt-4 space-x-2">
                  {latestArticles.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => slider?.current?.moveToIdx(idx)}
                      className={`w-3 h-3 rounded-full transition-colors ${currentSlide === idx ? "bg-[#ffc72c]" : "bg-gray-400"}`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="w-full lg:w-1/3 flex-shrink-0">
              <Newsletter />
            </div>
          </div>
        </>
      )}

      <div className="mb-10 mt-10">
        <h2 className="text-2xl font-semibold mb-4 text-[#2e2e38]">More Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedRemainingArticles.map((article) => (
            <Card key={article._id} className="rounded-2xl overflow-hidden shadow-sm">
              <Image
                src={article.thumbnail}
                alt={article.title}
                width={500}
                height={192}
                className="w-full h-48 object-cover"
                unoptimized={true}
              />
              <CardContent className="p-4">
                <h3 className="text-xl font-semibold text-[#2e2e38]">{article.title}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(article.date).toLocaleDateString()}
                </p>
                <p className="mt-2 text-sm text-gray-700 line-clamp-4">
                  {article.content.slice(0, 200)}...
                </p>
                <Link href={article.url} target="_blank" rel="noopener noreferrer">
                  <Button className="mt-4 w-full bg-[#ffc72c] text-black hover:bg-[#fcd84f]">
                    Read More
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {totalRemainingPages > 1 && (
          <div className="mt-6 flex justify-center space-x-4">
            <Button
              onClick={() => setRemainingPage((p) => Math.max(p - 1, 0))}
              disabled={remainingPage === 0}
              className="bg-[#ffc72c] text-black hover:bg-[#fcd84f]"
            >
              Previous
            </Button>
            <span className="self-center text-gray-700">
              Page {remainingPage + 1} of {totalRemainingPages}
            </span>
            <Button
              onClick={() => setRemainingPage((p) => Math.min(p + 1, totalRemainingPages - 1))}
              disabled={remainingPage === totalRemainingPages - 1}
              className="bg-[#ffc72c] text-black hover:bg-[#fcd84f]"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
