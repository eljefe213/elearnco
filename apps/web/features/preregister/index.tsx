"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Spacer,
  useDisclosure,
} from "@nextui-org/react";
import { apiPreregister } from "lib/requests/api.request";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { userAuthPreregisterSchema } from "schemas/auth/Auth";
import { toast } from "sonner";
import * as z from "zod";

import PreviewFeature from "../previewVideo";
type UserAuthPreregisterSchema = z.infer<typeof userAuthPreregisterSchema>;

const PreregisterFeature = () => {
  const t = useTranslations("");
  const te = useTranslations("errors");
  const SUCCESS = t("auth.form.preregister.success");
  const TITLE = t("auth.form.preregister.title");
  const BUTTON_REGISTER = t("button.preregister");
  const LOADING = t("button.loading");
  const EMAIL_PLACEHOLDER = t("auth.form.email.placeholder");
  const DESCRIPTION = t("auth.form.preregister.description");

  const PREVIEW_IS_READY = false;

  const [isLoading, setLoading] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleOpen = (): void => {
    onOpen();
  };
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<UserAuthPreregisterSchema>({
    resolver: zodResolver(userAuthPreregisterSchema),
  });

  const onSubmit = async (data: UserAuthPreregisterSchema): Promise<void> => {
    setLoading(true);
    const user = await apiPreregister?.(data);

    if (user.status === "success") {
      toast.success(SUCCESS);
    } else {
      const ERROR = te(user);
      toast.error(ERROR);
    }
    setLoading(false);
    reset();
  };

  return (
    <>
      <Modal backdrop="blur" size="2xl" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {TITLE} 🎉
              </ModalHeader>
              <ModalBody>
                <form
                  noValidate
                  className="flex flex-col gap-4"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Input
                        isRequired
                        label="Email"
                        placeholder={EMAIL_PLACEHOLDER}
                        type="email"
                        description={DESCRIPTION}
                        autoCorrect="off"
                        color={errors?.email ? "danger" : "default"}
                        autoCapitalize="none"
                        errorMessage={
                          errors?.email
                            ? (t(errors.email.message) as unknown as string)
                            : ""
                        }
                        {...field}
                      />
                    )}
                  />

                  <Spacer y={4} />

                  <div className="flex gap-2 justify-center self-center w-full md:w-2/5">
                    <Button
                      isLoading={isLoading}
                      type="submit"
                      fullWidth
                      color="primary"
                    >
                      {isLoading ? LOADING : BUTTON_REGISTER}
                    </Button>
                  </div>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="flex gap-4 items-center">
        <Button onClick={handleOpen} size="md" color="primary">
          {BUTTON_REGISTER}
        </Button>
        {PREVIEW_IS_READY && (
          <>
            <p className="tex-2xl py-5 text-center">Or</p>
            <PreviewFeature />
          </>
        )}
      </div>
    </>
  );
};

export default PreregisterFeature;
