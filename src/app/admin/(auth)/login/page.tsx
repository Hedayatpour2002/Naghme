import LoginForm from "@/components/auth/loginForm";

export default function AdminLogin() {
  return (
    <section className="flex flex-col gap-4 items-center">
      <LoginForm role="admin" />
    </section>
  );
}
