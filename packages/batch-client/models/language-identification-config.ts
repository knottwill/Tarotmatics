/* tslint:disable */
/* eslint-disable */
/**
 * Speechmatics ASR REST API
 * The Speechmatics Automatic Speech Recognition REST API is used to submit ASR jobs and receive the results. The supported job type is transcription of audio files.
 *
 * The version of the OpenAPI document: 2.0.0
 * Contact: support@speechmatics.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

/**
 *
 * @export
 * @interface LanguageIdentificationConfig
 */
export interface LanguageIdentificationConfig {
  /**
   *
   * @type {Array<string>}
   * @memberof LanguageIdentificationConfig
   */
  expected_languages?: Array<string>;
  /**
   * Action to take if all of the predicted languages are below the confidence threshold
   * @type {string}
   * @memberof LanguageIdentificationConfig
   */
  low_confidence_action?: LanguageIdentificationConfigLowConfidenceActionEnum;
  /**
   *
   * @type {string}
   * @memberof LanguageIdentificationConfig
   */
  default_language?: string;
}

export const LanguageIdentificationConfigLowConfidenceActionEnum = {
  Allow: 'allow',
  Reject: 'reject',
  UseDefaultLanguage: 'use_default_language',
} as const;

export type LanguageIdentificationConfigLowConfidenceActionEnum =
  (typeof LanguageIdentificationConfigLowConfidenceActionEnum)[keyof typeof LanguageIdentificationConfigLowConfidenceActionEnum];
