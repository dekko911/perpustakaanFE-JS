import { useEffect, useRef, useState } from "react";
import { GrDocumentUpdate } from "react-icons/gr";
import { useNavigate, useParams } from "react-router";
import { Button } from "../../components/ui/button";
import { InputUpdate, InputUpdateFile } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { AuthLayout } from "../../layouts/auth";
import { swalToast } from "../../lib/sweet-alert";
import { axios_api_init, cn } from "../../lib/utils";
import Loading from "/src/assets/images/loading.gif";

export const UpdateUserPage = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    avatar: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [previewPhoto, setPreviewPhoto] = useState(null);

  const tempPhotoRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios_api_init.get(`/api/user/${params.id}`, {
        method: "GET",
      });

      setForm({
        name: res.data.data.name,
        email: res.data.data.email,
      });

      tempPhotoRef.current = res.data.data.r2_avatar_url;
      setPreviewPhoto(tempPhotoRef?.current);
    };

    fetchUser();
  }, [params.id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const formData = new FormData();

      form.name && formData.append("name", form.name);
      form.email && formData.append("email", form.email);
      form.password && formData.append("password", form.password);
      form.avatar && formData.append("avatar", form.avatar);

      const res = await axios_api_init.put(`/api/user/${params.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        method: "PUT",
      });

      if (res.data) {
        swalToast("success", `${res.data.message}`, 250);
        navigate("/users");
      }
    } catch (err) {
      console.error(err);
      swalToast("error", `${err.response.data.error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div>
        <form method="PUT" onSubmit={handleUpdate}>
          <Label>Nama</Label>
          <InputUpdate
            name="name"
            placeholder="Enter your name..."
            defaultValue={form.name}
            onKeyUp={(e) => setForm({ ...form, name: e.target.value })}
          />

          <Label>Email</Label>
          <InputUpdate
            type="email"
            name="email"
            placeholder="example@example.com"
            defaultValue={form.email}
            onKeyUp={(e) => setForm({ ...form, email: e.target.value })}
          />

          <Label>Password</Label>
          <InputUpdate
            type="password"
            name="password"
            placeholder="Enter your password..."
            defaultValue={form.password}
            onKeyUp={(e) => setForm({ ...form, password: e.target.value })}
          />

          <Label>Avatar</Label>
          <img
            className={cn(
              "rounded-xl size-34 my-3",
              previewPhoto === "-" ? "hidden" : "block",
            )}
            src={previewPhoto}
            alt="avatar old"
          />
          <InputUpdateFile
            onChange={(e) => {
              const file = e.target.files[0];

              if (file) {
                setPreviewPhoto(URL.createObjectURL(file));
              } else {
                setPreviewPhoto(tempPhotoRef?.current);
              }

              setForm({ ...form, avatar: file });
            }}
          />

          <Button disabled={isLoading}>
            {isLoading ? (
              <img src={Loading} alt="" className="w-5" />
            ) : (
              <GrDocumentUpdate />
            )}
            Update
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
};
