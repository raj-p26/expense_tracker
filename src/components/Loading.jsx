import LoadingIcon from "@assets/LoadingIcon";

export default function Loading() {
  return (
    <>
      <div className="size-full fixed inset-0 bg-scrim/60" />
      <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <LoadingIcon />
      </div>
    </>
  );
}
