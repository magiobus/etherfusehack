/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import AccountLayout from "@/components/layouts/AccountLayout";
import ProjectForm from "/components/forms/ProjectForm";

const ProjectEdit = () => {
  return (
    <AccountLayout title="Agrega un proyecto">
      <div className="w-full flex justify-center">
        <div className="relative bg-white w-full ">
          <div>
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="bg-white py-6  space-y-6 ">
                <div className="flex justify-between px-4 w-full items-center ">
                  <h3 className="text-lg leading-6 font-medium text-happy-yellow bg-happy-middark">
                    Edita tu proyecto
                  </h3>
                </div>
                <div className="flex flex-col px-4">
                  <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                      <div className="formcontainer">
                        <ProjectForm type="edit" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AccountLayout>
  );
};

export default ProjectEdit;
