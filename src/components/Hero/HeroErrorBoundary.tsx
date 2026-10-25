import React, { Component, ErrorInfo, ReactNode } from "react";
import { Sparkles } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class HeroErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn("WebGL / 3D Canvas Error caught in HeroErrorBoundary:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center p-8 rounded-3xl bg-white/[0.03] border border-amber-500/20 backdrop-blur-xl text-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-[#d4af37] animate-pulse" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">3D Interactive Experience</h3>
          <p className="text-sm text-[#dfd7c5]/70 max-w-sm">
            High-performance WebGL showcase loaded in standard presentation mode.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
