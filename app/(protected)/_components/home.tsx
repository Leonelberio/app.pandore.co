"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";
import { LoginButton } from "@/components/auth/login-button";
import { LogoutButton } from "@/components/auth/logout-button";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function HomeComponent() {
  const { data: session } = useSession(); // Access session data using useSession hook
  const [comparators, setComparators] = useState([]);
  const [place, setPlace] = useState("Any Type");
  const [accessory, setAccessory] = useState("Any Type");
  const [price, setPrice] = useState("Any Prices");
  const router = useRouter();

  useEffect(() => {
    // Fetch the comparators data from the backend
    fetch("/api/comparators/all")
      .then((res) => res.json())
      .then((data) => setComparators(data.comparators))
      .catch((error) => console.error("Error fetching comparators:", error));
  }, []);

  const handleCardClick = (id) => {
    // Navigate to the comparator's detailed view
    router.push(`/web/comparators/${id}/views/compare`);
  };

  const handleCreateComparator = () => {
    router.push("/web/comparators/new");
  };


  const showDashBoard = () => {
    router.push("/web");
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <header className="flex justify-between items-center py-6">
        <div className="flex items-center space-x-4">
          <Image src="/favicon.ico" alt="Logo" width={50} height={40} />
        </div>
        {session ? (
          <div className="flex flex-row gap-2">
          <LogoutButton asChild>
            <Button size="lg">Se déconnecter</Button>
          </LogoutButton>
          <Link href="/web">
          
          <Button size="lg" variant="outline">Tableau de Bord</Button>
          </Link>
          </div>
        ) : (
          <LoginButton asChild>
            <Button size="lg">Se connecter</Button>
          </LoginButton>
        )}
      </header>

      {/* Title Section */}
      <section className="flex align-middle justify-center">
        <div className="flex flex-col gap-6 text-center pt-16 pb-4 max-w-3xl">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Faites le meilleur choix avec nos
            <span className="text-purple-600"> comparateurs.</span>
          </h1>
          <p className="leading-7">Explorez nos outils de comparaison pour trouver ce qui vous convient le mieux.</p>
        </div>
      </section>

      {/* Filters Section */}
      <div className="flex justify-center items-center space-x-4">
        <Select onValueChange={setPlace} defaultValue="Any Type">
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Select Place" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Any Type">Any Type</SelectItem>
            <SelectItem value="Stadium">Stadium</SelectItem>
            <SelectItem value="Gym">Gym</SelectItem>
            <SelectItem value="Outdoor">Outdoor</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={setAccessory} defaultValue="Any Type">
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Accessories Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Any Type">Any Type</SelectItem>
            <SelectItem value="Footballs">Footballs</SelectItem>
            <SelectItem value="T Shirts">T Shirts</SelectItem>
            <SelectItem value="Shoes">Shoes</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={setPrice} defaultValue="Any Prices">
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Pricing Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Any Prices">Any Prices</SelectItem>
            <SelectItem value="$0-$50">$0-$50</SelectItem>
            <SelectItem value="$50-$100">$50-$100</SelectItem>
            <SelectItem value="$100+">$100+</SelectItem>
          </SelectContent>
        </Select>

        <Button size="lg" variant="outline">
          Filtrer
        </Button>
      </div>

      {/* Products Section */}
      {comparators.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {comparators.map((comparator) => (
            <Card key={comparator.id} onClick={() => handleCardClick(comparator.id)} className="cursor-pointer">
              <CardContent className="p-4">
                <Image
                  src={comparator.logo || "placeholder.svg"}
                  alt={comparator.name}
                  className="aspect-square w-full rounded-md object-contain"
                  width={300}
                  height={300}
                />
                <CardHeader className="mt-4">
                  <CardTitle>{comparator.name}</CardTitle>
                  <CardDescription>{comparator.description}</CardDescription>
                </CardHeader>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-lg font-semibold mb-6">Aucun comparateur</p>
          <Button onClick={handleCreateComparator} size="lg" variant="outline">
            Créer un comparateur
          </Button>
        </div>
      )}
    </div>
  );
}
