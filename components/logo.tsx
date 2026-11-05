export function Logo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 56 40" width="42" height="30" aria-hidden="true">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M3 32 13.5 8h5L29 32h-5.4l-2-5H10.4l-2 5H3Zm9.2-9.4h7.6L16 13l-3.800 9.600ZM31 8h11a8.500 8.500 0 0 1 0 17h-5.800v7H31V8Zm5.200 4.400v8.200h5.400a4.100 4.100 0 0 0 0-8.200h-5.400Z"
      />
    </svg>
  );
}
