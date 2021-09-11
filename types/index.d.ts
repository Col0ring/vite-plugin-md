import { Plugin } from 'vite';
import { MarkedRenderOptions } from './utils';
export declare type mdPluginOptions = MarkedRenderOptions;
declare function mdPlugin(options?: mdPluginOptions): Plugin;
export default mdPlugin;
