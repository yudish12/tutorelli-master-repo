import ForgotPasswordForm from "../../_components/ForgotPasswordForm";
const Page = () => {
  return (
    <div className="w-[95vw] h-[87vh] p-8 rounded-2xl flex mx-auto mt-8 bg-white overflow-auto">
      <div className="bg-blue w-[35%] rounded-2xl p-4 mx-auto text-white overflow-auto">
        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default Page;
