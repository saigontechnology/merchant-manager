/**
 * Returns the `element` to render if `condition` is truthy.
 * Example:
 * ```js
 * <div>
 *  {render(isInvalid)(<span>Invalid!</span>)}
 * </div>
 * ```
 */
const renderIf = condition => element => (condition ? element : null);
export default renderIf;
