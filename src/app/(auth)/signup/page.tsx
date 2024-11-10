import AuthToggle from "@/components/auth/authToggle";
import SignupForm from "@/components/auth/signupForm";

export default function LoginPage() {
  return (
    <section className="flex flex-col gap-4 items-center">
      <AuthToggle isLogin={false} />
      <SignupForm />
    </section>
  );
}
