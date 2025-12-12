// lib/image.ts
export function cloudinaryFaceCrop(
  url: string,
  opts?: { w?: number; h?: number; type?: "thumb" | "fill" }
) {
  try {
    const w = opts?.w ?? 720;
    const h = opts?.h ?? 720;
    const type = opts?.type ?? "fill";
    const mode = type === "thumb" ? "c_thumb" : "c_fill";
    return url.replace("/upload/", `/upload/${mode},g_face,w_${w},h_${h}/`);
  } catch {
    return url;
  }
}
