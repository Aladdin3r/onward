import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SideNavBar } from "@/styles/components/sidenav"; 

const variants = {
  default: "/",
  variant2: "/",
  variant3: "/practice",
  variant4: "/",
};

export default function Layout({ children }) {
  const router = useRouter(); 
  const [activeVariant, setActiveVariant] = useState("default");

  // update active link based on the URL
  useEffect(() => {
    const currentPath = router.pathname;

    // matching it to variant prop
    const foundVariant = Object.keys(variants).find(
      (key) => variants[key] === currentPath
    );
    setActiveVariant(foundVariant || "default");
  }, [router.pathname]);

  return (
    <>
      <apptopnav title="Onward" />
        <SideNavBar activeVariant={activeVariant} /> 
      <main>{children}</main>
    </>
  );
}
