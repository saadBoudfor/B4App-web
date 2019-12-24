export class StringUtils {
  /**
   * Check if given string is not empty
   * @author Boudfor
   * @param value string to check
   */
  public static hasContent(value: string) {
    return value && value.length !== 0;
  }
}
