import React from "react";
import { client } from "./sanityclient";
import imageUrlBuilder from "@sanity/image-url";

interface Source {
  _type: "image";
  asset: any;
}

const builder = imageUrlBuilder(client);

export function urlFor(source: Source) {
  return builder.image(source).url();
}
