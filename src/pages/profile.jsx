import { useCallback, useEffect, useRef, useState } from "react";
import { FaSave } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
import { ButtonProfile } from "../components/ui/button";
import { PhotoContainer } from "../components/ui/image";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { AuthLayout } from "../layouts/auth";
import { axios_api_init } from "../lib/utils";
import Loading from "/src/assets/images/loading.gif";
import ProfileDefault from "/src/assets/images/profile.png";

// PERBAIKI ISI DARI PROFILE PAGE INI NANTI !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// BUATKAN BUTTON DAN INPUT KHUSUS !!!!!!!!!!!!!!!!!!!!!!
export const ProfilePage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const [profile, setProfile] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios_api_init.get(`/profile`, {
        method: "GET",
      });

      setProfile(res.data.user);
      setImagePreview(`${res.data.user.r2_avatar_url}`);
    };

    fetchData();
  }, [params.id]);

  const handleProfile = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        setIsLoading(true);
        const formData = new FormData();

        profile.name && formData.append("name", profile.name);
        profile.email && formData.append("email", profile.email);
        profile.password && formData.append("password", profile.password);
        profile.avatar && formData.append("avatar", profile.avatar);

        const res = await axios_api_init.post(
          `/api/users/${params.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            method: "POST",
          },
        );

        if (res.data) {
          navigate("/dashboard");
        }
      } catch (e) {
        // console.error(e);
        if (e.status && e.status === 400) {
          setValidationError(e.response.data.error);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [params.id, profile, navigate],
  );

  return (
    <AuthLayout>
      <div className="grid grid-rows-2 h-70 m-2 relative">
        <form
          onSubmit={handleProfile}
          method="POST"
          className="flex gap-3 items-center pb-8"
        >
          <input type="hidden" name="_method" value="PATCH" />
          {imagePreview ? (
            <PhotoContainer
              imageSrc={imagePreview}
              className="w-25 rounded-full me-3"
            />
          ) : (
            <PhotoContainer
              imageSrc={ProfileDefault}
              className="w-25 rounded-full me-3"
            />
          )}
          <Input
            className="hidden"
            ref={fileRef}
            type="file"
            name="avatar"
            defaultValue={profile.avatar}
            onChange={(e) => {
              const file = e.target.files[0];

              if (file) {
                const imageUrl = URL.createObjectURL(file);
                setImagePreview(imageUrl);
              }

              setProfile((prev) => {
                return { ...prev, [e.target.name]: file };
              });
            }}
          />
          <ButtonProfile
            onClick={() => {
              fileRef.current?.click();
            }}
          >
            Change Photo
          </ButtonProfile>

          <ButtonProfile className="bg-white text-black flex items-center gap-x-1.5 hover:bg-white/50">
            {isLoading ? (
              <img src={Loading} alt="" className="w-5" />
            ) : (
              <FaSave />
            )}
            Save
          </ButtonProfile>
          {validationError.avatar && (
            <span className="text-red-500 block">{validationError.avatar}</span>
          )}
        </form>

        <form onSubmit={handleProfile} method="POST">
          <input type="hidden" name="_method" value="PATCH" />
          <Label htmlFor="name">Name</Label>
          <Input
            name="name"
            defaultValue={profile.name}
            onKeyUp={(e) => {
              setProfile((prev) => {
                return { ...prev, [e.target.name]: e.target.value };
              });
            }}
          />
          {validationError.name && (
            <span className="text-red-500 block">{validationError.name}</span>
          )}

          <div className="my-3">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              defaultValue={profile.email}
              onKeyUp={(e) => {
                setProfile((prev) => {
                  return { ...prev, [e.target.name]: e.target.value };
                });
              }}
            />
            {validationError.email && (
              <span className="text-red-500 block">
                {validationError.email}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-x-4 mt-3 w-auto">
            <Label htmlFor="password">Password</Label>
            <Label htmlFor="password_confirmation">Confirm Password</Label>

            <Input
              type="password"
              name="password"
              className="xl:w-133"
              autoComplete="new-password"
              defaultValue={profile.password}
              onKeyUp={(e) => {
                setProfile((prev) => {
                  return { ...prev, [e.target.name]: e.target.value };
                });
              }}
            />
            {validationError.password && (
              <span className="text-red-500 block">
                {validationError.password}
              </span>
            )}

            <Input
              type="password"
              name="password_confirmation"
              className="xl:w-138"
              autoComplete="new-password"
              defaultValue={profile.password_confirmation}
              onKeyUp={(e) => {
                setProfile((prev) => {
                  return { ...prev, [e.target.name]: e.target.value };
                });
              }}
            />
            {validationError.password_confirmation && (
              <span className="text-red-500 block">
                {validationError.password_confirmation}
              </span>
            )}
          </div>

          <ButtonProfile className="mt-5 absolute right-0 flex items-center gap-x-1.5 hover:text-white/50">
            {isLoading ? (
              <img src={Loading} alt="" className="w-5" />
            ) : (
              <FaSave />
            )}
            Save
          </ButtonProfile>
        </form>
      </div>
    </AuthLayout>
  );
};
