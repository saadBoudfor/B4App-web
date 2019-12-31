export class ObjectUtils {
  public static toString(obj: any): string {
    return JSON.stringify(obj);
  }

  public static isEmpty(obj: any) {
    return obj === null || obj === undefined;
  }
}
