import { LoginComponent } from "@/app/_components/LoginComponent";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex items-center justify-center w-full">
        <LoginComponent />
      </div>
    </div>
  );
}
