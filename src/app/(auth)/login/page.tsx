import AuthToggle from "@/components/auth/authToggle";
import LoginForm from "@/components/auth/loginForm";

export default function LoginPage() {
  return (
    <section className="flex flex-col gap-4 items-center">
      <AuthToggle isLogin={true} />
      <LoginForm />
    </section>
  );
}
