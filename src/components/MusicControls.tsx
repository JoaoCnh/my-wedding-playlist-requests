import { createEffect, createSignal, JSX, Show } from "solid-js";
import cx from "classnames";

import { random } from "~/lib/random";
import { useCarouselProvider } from "~/providers/CarouselProvider";

import LeftChevron from "./LeftChevron";
import PauseCircle from "./PauseCircle";
import PlayCircle from "./PlayCircle";
import RightChevron from "./RightChevron";
import Shuffle from "./Shuffle";

type HTMLButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement>;

function ControlButton(props: HTMLButtonProps) {
  return (
    <button
      {...props}
      class={cx(
        props.class,
        "text-center rounded-full text-rose-500 disabled:text-rose-500/30"
      )}
    />
  );
}

function ChevronButton(props: HTMLButtonProps) {
  return <ControlButton {...props} class={cx(props.class, "w-12 h-12")} />;
}

function PlayPauseButton(props: HTMLButtonProps) {
  return <ControlButton {...props} class={cx(props.class, "w-24 h-24")} />;
}

export default function MusicControls() {
  const ctx = useCarouselProvider();

  let audioPlayer: HTMLAudioElement | undefined;

  const [playing, setPlaying] = createSignal(false);

  const previewUrl = () => ctx.selectedSong().track_preview_url;
  const prevDisabled = () => ctx.selectedIndex() === 0;
  const nextDisabled = () => ctx.selectedIndex() === ctx.songs.length - 1;

  const play = () => {
    setPlaying(true);
    audioPlayer?.play();
  };

  const pause = () => {
    setPlaying(false);
    audioPlayer?.pause();
  };

  createEffect(() => {
    if (audioPlayer) {
      audioPlayer.src = previewUrl();
      playing() && play();
    } else {
      audioPlayer = new window.Audio(previewUrl());
    }

    audioPlayer.onended = () => {
      pause();
    };
  });

  return (
    <div class="relative mx-auto flex items-center justify-evenly my-7 px-4 bg-slate-50 rounded-full drop-shadow-xl">
      <ChevronButton
        disabled={prevDisabled()}
        onClick={() => {
          ctx.scrollToItem(ctx.selectedIndex() - 1);
        }}
        aria-label="Previous album"
      >
        <LeftChevron class="w-full" />
      </ChevronButton>

      <Show
        when={playing()}
        fallback={
          <PlayPauseButton onClick={() => play()} aria-label="Play song">
            <PlayCircle class="w-full" />
          </PlayPauseButton>
        }
      >
        <PlayPauseButton onClick={() => pause()} aria-label="Pause song">
          <PauseCircle class="w-full" />
        </PlayPauseButton>
      </Show>

      <ChevronButton
        disabled={nextDisabled()}
        onClick={() => {
          ctx.scrollToItem(ctx.selectedIndex() + 1);
        }}
        aria-label="Next album"
      >
        <RightChevron class="w-full" />
      </ChevronButton>

      <ChevronButton
        class="absolute -bottom-14"
        onClick={() => {
          ctx.scrollToItem(random(0, ctx.songs.length - 1));
        }}
        aria-label="Shuffle"
      >
        <Shuffle class="w-full text-white drop-shadow-2xl" />
      </ChevronButton>
    </div>
  );
}
