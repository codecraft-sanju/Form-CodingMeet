import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Lock } from "lucide-react";
import Footer from "../components/Footer";

const Premium = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen bg-[#121316] flex flex-col items-center justify-center px-4 py-10 sm:px-6 md:px-8 space-y-10">
        <div className="flex items-center justify-between w-full max-w-5xl">
          <button
            onClick={() => navigate(-1)}
            className="text-white flex items-center gap-2 bg-[#2a2b2f] hover:bg-[#383a3f] px-4 py-2 rounded-lg font-medium transition cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <h1 className="lg:text-3xl md:text-2xl text-xl text-center text-white font-bold">
            Premium Learning Access
          </h1>
        </div>

        <div className="w-full max-w-5xl bg-[#1D1E21] rounded-xl p-6 sm:p-8 space-y-6 text-white shadow-2xl">
          <p className="text-center text-lg text-yellow-400 mb-4">
            Unlock advanced content and coding challenges after 150+ learners
            join.
          </p>
          <p className="text-center text-green-400 mb-4">
            Current Registered Learners: 116
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-[#2a2b2f] p-6 rounded-lg shadow-xl flex flex-col items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-105">
              <div className="mb-4">
                <Lock className="w-12 h-12 text-red-500" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">
                DSA Mastery Course
              </h3>
              <p className="text-center text-sm sm:text-base mb-4">
                Learn DSA through structured challenges and guided projects.
                Ideal for cracking interviews.
              </p>
              <p className="text-center text-sm text-red-500">
                Locked until 150+ registrations
              </p>
            </div>

            <div className="bg-[#2a2b2f] p-6 rounded-lg shadow-xl flex flex-col items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-105">
              <div className="mb-4">
                <Lock className="w-12 h-12 text-yellow-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">
                Hackathon Challenge
              </h3>
              <p className="text-center text-sm sm:text-base mb-4">
                Compete, collaborate, and build under pressure. A real-world
                coding showdown — coming soon!
              </p>
              <p className="text-center text-sm text-red-500">
                Locked until 150+ registrations
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Premium;
