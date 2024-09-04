// @ts-nocheck


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
import { Banknote, ShieldCheck, Users } from "lucide-react";

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

     
     {/* Centered Cards Section */}
     <div className="flex justify-center gap-10">
        {/* Assurances Card */}
        <Link href="/assurances" passHref>
          <Card className="cursor-pointer max-w-xs shadow-lg hover:shadow-xl transition">
            <CardContent className="p-6 flex flex-col items-center">
              <ShieldCheck size={60} className="text-purple-600 mb-4" />
              <CardHeader>
                <CardTitle className="text-xl">Assurances</CardTitle>
              </CardHeader>
            </CardContent>
          </Card>
        </Link>

        {/* Banques Card */}
        <Link href="#" passHref>
          <Card className="cursor-pointer max-w-xs shadow-lg hover:shadow-xl transition">
            <CardContent className="p-6 flex flex-col items-center">
              <Banknote size={60} className="text-purple-600 mb-4" />
              <CardHeader>
                <CardTitle className="text-xl">Banques</CardTitle>
              </CardHeader>
            </CardContent>
          </Card>
        </Link>

        {/* Influenceurs Card */}
        <Link href="#" passHref>
          <Card className="cursor-pointer max-w-xs shadow-lg hover:shadow-xl transition">
            <CardContent className="p-6 flex flex-col items-center">
              <Users size={60} className="text-purple-600 mb-4" />
              <CardHeader>
                <CardTitle className="text-xl">Influenceurs</CardTitle>
              </CardHeader>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
