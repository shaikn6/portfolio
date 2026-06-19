import { Component, type ReactNode } from 'react'

/** Catches any render/runtime error in children and renders nothing instead of crashing the app. */
export default class SafeBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch(err: unknown) { console.warn('SafeBoundary caught:', err) }
  render() { return this.state.failed ? null : this.props.children }
}
