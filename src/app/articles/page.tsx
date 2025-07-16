"use client";

import { useState, useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";


import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import ReactMarkdown from "react-markdown";

// your newsletter import
import { Newsletter } from "@/components/sections/Newsletter";

type Article = {
  _id: string;
  title: string;
  date: string;
  content: string;
  thumbnail?: string;       // optional
  url: string;
  sector: string;
  type: string;
  summary: string;
};

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [remainingPage, setRemainingPage] = useState(0);

  // dialog state
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Article | null>(null);

  const articlesPerPage = 6;
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "snap",
    slides: { perView: 1, spacing: 30 },
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
        data.sort(
          (a, b) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setArticles(data);
      } catch (error) {
        console.error("Failed to fetch or parse articles:", error);
      }
    }
    fetchArticles();
  }, []);

  const latestArticles = articles.slice(0, 4);
  const remainingArticles = articles.slice(4);
  const totalRemainingPages = Math.ceil(
    remainingArticles.length / articlesPerPage
  );
  const paginatedRemainingArticles = remainingArticles.slice(
    remainingPage * articlesPerPage,
    remainingPage * articlesPerPage + articlesPerPage
  );

  function handleOpen(a: Article) {
    setSelected(a);
    setOpen(true);
  }

  // helper for safe src
  const safeSrc = (thumb?: string) =>
    thumb && typeof thumb === "string" ? thumb : "/default-thumb.jpg";

  return (
    <div className="min-h-screen bg-[#f9f9f6] py-10 px-6 max-w-7xl mx-auto">
      <nav className="mb-8 flex items-center justify-between border-b border-gray-300 pb-4">
        <h1 className="text-4xl font-bold text-[#2e2e38]">
          Tech Articles
        </h1>
      </nav>

      {latestArticles.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold mb-4 text-[#2e2e38]">
            Latest Articles
          </h2>
          <div className="flex flex-col lg:flex-row gap-10 mb-16">
            {/* carousel */}
            <div className="flex-grow min-w-0 overflow-hidden lg:w-2/3 relative">
              <button
                aria-label="Prev"
                onClick={() => slider?.current?.prev()}
                className="absolute top-1/2 left-0 -translate-y-1/2 px-3 text-7xl text-[#ffc72c] hover:text-[#fcd84f]"
                style={{ background: "transparent", zIndex: 20 }}
              >
                ‹
              </button>
              <button
                aria-label="Next"
                onClick={() => slider?.current?.next()}
                className="absolute top-1/2 right-0 -translate-y-1/2 px-3 text-7xl text-[#ffc72c] hover:text-[#fcd84f]"
                style={{ background: "transparent", zIndex: 20 }}
              >
                ›
              </button>
              <div className="relative px-10">
                <div
                  ref={sliderRef}
                  className="keen-slider mb-2"
                  style={{ overflow: "visible" }}
                >
                  {latestArticles.map((art, idx) => (
                    <div
                      key={art._id}
                      className={`keen-slider__slide ${
                        idx === currentSlide ? "active" : ""
                      }`}
                      style={{
                        width: "80%",
                        marginLeft: idx === 0 ? "10%" : undefined,
                        marginRight:
                          idx === latestArticles.length - 1
                            ? "10%"
                            : undefined,
                      }}
                    >
                      <Card className="rounded-2xl overflow-hidden shadow-md flex flex-col h-full">
                        <Image
                          src={safeSrc(art.thumbnail)}
                          alt={art.title}
                          width={800}
                          height={400}
                          className="w-full h-64 object-cover"
                          unoptimized
                        />
                        <CardContent className="p-8 flex flex-col flex-grow">
                          <h3 className="text-2xl font-semibold text-[#2e2e38] min-h-[3rem]">
                            {art.title}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {new Date(art.date).toLocaleDateString()}
                          </p>
                          <p className="mt-2 text-gray-700 line-clamp-4 flex-grow">
                            {art.summary}
                          </p>
                          <Button
                            className="mt-4 w-[80%] bg-[#ffc72c] text-black hover:bg-[#fcd84f]"
                            onClick={() => handleOpen(art)}
                          >
                            Read More
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center mt-4 space-x-2">
                  {latestArticles.map((_, i) => (
                    <button
                      key={i}
                      onClick={() =>
                        slider?.current?.moveToIdx(i)
                      }
                      className={`w-3 h-3 rounded-full ${
                        currentSlide === i
                          ? "bg-[#ffc72c]"
                          : "bg-gray-400"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* newsletter */}
            <div className="w-full lg:w-1/3 flex-shrink-0">
              <Newsletter />
            </div>
          </div>
        </>
      )}

      {/* more articles grid */}
      <div className="mb-10 mt-10">
        <h2 className="text-2xl font-semibold mb-4 text-[#2e2e38]">
          More Articles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedRemainingArticles.map((art) => (
            <Card
              key={art._id}
              className="rounded-2xl overflow-hidden shadow-sm"
            >
              <Image
                src={safeSrc(art.thumbnail)}
                alt={art.title}
                width={500}
                height={192}
                className="w-full h-48 object-cover"
                unoptimized
              />
              <CardContent className="p-4 flex flex-col">
                <h3 className="text-xl font-semibold text-[#2e2e38]">
                  {art.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {new Date(art.date).toLocaleDateString()}
                </p>
                <p className="mt-2 text-sm text-gray-700 line-clamp-4 flex-grow">
                  {art.summary}
                </p>
                <Button
                  className="mt-4 w-full bg-[#ffc72c] text-black hover:bg-[#fcd84f]"
                  onClick={() => handleOpen(art)}
                >
                  Read More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {totalRemainingPages > 1 && (
          <div className="mt-6 flex justify-center space-x-4">
            <Button
              onClick={() =>
                setRemainingPage((p) => Math.max(p - 1, 0))
              }
              disabled={remainingPage === 0}
              className="bg-[#ffc72c] text-black hover:bg-[#fcd84f]"
            >
              Previous
            </Button>
            <span className="self-center text-gray-700">
              Page {remainingPage + 1} of {totalRemainingPages}
            </span>
            <Button
              onClick={() =>
                setRemainingPage((p) =>
                  Math.min(p + 1, totalRemainingPages - 1)
                )
              }
              disabled={
                remainingPage === totalRemainingPages - 1
              }
              className="bg-[#ffc72c] text-black hover:bg-[#fcd84f]"
            >
              Next
            </Button>
          </div>
        )}
      </div>

      {/* single global dialog */}
    <Dialog open={open} onOpenChange={setOpen}>
  <DialogContent
    className="
      flex flex-col
      w-full
      sm:max-w-[1024px]
      max-w-[calc(100%-2rem)]
      max-h-[80vh]
      p-6
    "
  >
    {selected && (
      <>
        <DialogHeader className="flex flex-col items-center gap-4">
          {selected.thumbnail && (
            <Image
              src={safeSrc(selected.thumbnail)}
              alt={selected.title}
              width={400}
              height={200}
              className="w-[400px] h-[200px] object-cover rounded-md"
              unoptimized
            />
          )}

          <DialogTitle className="text-xl font-semibold text-center">
            {selected.title}
          </DialogTitle>

          <DialogDescription className="text-sm text-muted-foreground text-center">
            Published on{" "}
            {new Date(selected.date).toLocaleDateString()}
          </DialogDescription>
        </DialogHeader>

        <div className="prose flex-1 overflow-auto mt-4">
          <ReactMarkdown>{selected.content}</ReactMarkdown>
        </div>
      </>
    )}
  </DialogContent>
</Dialog>

    </div>
  );
}