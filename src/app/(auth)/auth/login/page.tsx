import LoginForm from "../../_components/LoginForm";

const LoginPage = () => {
  return (
    <div className="w-[95vw] h-[87vh] p-8 rounded-2xl flex mx-auto mt-8 bg-white">
      <div className="scroll-container bg-blue w-[35%] rounded-2xl p-4 mx-auto text-white overflow-auto">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
