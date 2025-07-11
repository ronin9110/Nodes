import { SignUp } from "@clerk/nextjs";

export default async function Page() {
  return (
    <SignUp
      appearance={{
        layout: {
          logoImageUrl: "/assets/logo.svg",
          logoPlacement: "inside",
          socialButtonsPlacement: "bottom",
          socialButtonsVariant: "auto",
          termsPageUrl: "https://clerk.com/terms",
        },
        elements: {
          logoImage: "invert",
        },
      }}
    />
  );
}
