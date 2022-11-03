import Image from "next/image";
import Link from "next/link";
const VerifyRequestPage = () => {
  return (
    <div className="min-h-full w-full">
      <div className="flex-1 h-full flex justify-center items-center flex-col py-12 px-4 sm:px-6  lg:px-20 xl:px-24">
        <div className="message my-4 flex justify-center flex-col items-center">
          <div className="flex flex-col items-center justify-center">
            <Link href="/">
              <a>
                <Image
                  className="mx-auto w-24"
                  src="/images/etherfuse_squarelogo.jpeg"
                  alt="patitorosa"
                  width={100}
                  height={100}
                />
              </a>
            </Link>
            <h2 className="mt-6 text-center text-3xl tracking-tight font-bold text-happy-yellow bg-black px-4 py-2">
              Inicia Sesión
            </h2>
          </div>
          <p className="font-bold text-happy-yellow bg-black px-2">
            Te hemos enviado un email 🙌
          </p>{" "}
          <p>
            Da click en el link que te enviamos a tu correo electrónico para
            poder iniciar sesión
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyRequestPage;
