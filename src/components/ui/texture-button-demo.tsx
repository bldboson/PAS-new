import React from "react"
import { ChevronLeft, Trash, X } from "lucide-react"
import { TextureButton } from "./texture-button"

export function TextureButtonDemo() {
  return (
    <div className="dark:bg-stone-950 py-6 px-4 md:px-0 rounded-md flex justify-center">
      <div>
        <div className="flex flex-col gap-3 max-w-lg mt-4">
          <div className="flex gap-3">
            <div>
              <TextureButton size="sm">Primary</TextureButton>
            </div>
            <div>
              <TextureButton>Primary</TextureButton>
            </div>
            <div className="md:w-36 hidden md:block">
              <TextureButton size="lg">Primary</TextureButton>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 max-w-lg mt-4">
          <div className="flex gap-3">
            <div>
              <TextureButton variant="emerald" size="sm">
                Society Emerald
              </TextureButton>
            </div>
            <div>
              <TextureButton variant="emerald">Society Emerald</TextureButton>
            </div>
            <div className="md:w-36 hidden md:block">
              <TextureButton variant="emerald" size="lg">
                Society Emerald
              </TextureButton>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 max-w-lg mt-4">
          <div className="flex gap-3">
            <div>
              <TextureButton variant="accent" size="sm">
                Accent
              </TextureButton>
            </div>
            <div>
              <TextureButton variant="accent">Accent</TextureButton>
            </div>
            <div className="md:w-36 hidden md:block">
              <TextureButton variant="accent" size="lg">
                Accent
              </TextureButton>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 max-w-lg mt-4">
          <div className="flex gap-3 w-full">
            <div>
              <TextureButton variant="secondary" size="sm">
                Secondary
              </TextureButton>
            </div>
            <div>
              <TextureButton variant="secondary">Secondary</TextureButton>
            </div>
            <div className="hidden md:block md:w-48">
              <TextureButton variant="secondary" size="lg">
                Secondary
              </TextureButton>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 max-w-lg mt-4">
          <div className="flex gap-3 w-full">
            <div>
              <TextureButton variant="destructive" size="sm">
                Destructive
              </TextureButton>
            </div>
            <div>
              <TextureButton variant="destructive">Destructive</TextureButton>
            </div>
            <div className="hidden md:block md:w-48">
              <TextureButton variant="destructive" size="lg">
                Destructive
              </TextureButton>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 max-w-lg mt-4">
          <div className="flex gap-3 w-full">
            <div>
              <TextureButton variant="minimal" size="sm">
                Minimal
              </TextureButton>
            </div>
            <div>
              <TextureButton variant="minimal">Minimal</TextureButton>
            </div>
            <div className="hidden md:block md:w-48">
              <TextureButton variant="minimal" size="lg">
                Minimal
              </TextureButton>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 max-w-xs mt-4">
          <div className="flex gap-3">
            <TextureButton variant="icon" size="icon" aria-label="Back">
              <ChevronLeft className="h-5 w-5 p-0.5" />
            </TextureButton>

            <TextureButton variant="icon" size="icon" aria-label="Delete">
              <Trash className="h-5 w-5 p-0.5" />
            </TextureButton>

            <TextureButton variant="icon" size="icon" aria-label="Close">
              <X className="h-5 w-5 p-0.5" />
            </TextureButton>
          </div>
        </div>
      </div>
    </div>
  )
}

