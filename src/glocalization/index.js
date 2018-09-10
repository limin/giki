/**
 * @file
 * 
 * @copyright 2018 {@link https://limin.github.io Min Li}
 * 
 * @license Licensed under {@link https://www.apache.org/licenses/LICENSE-2.0.html Apache License 2.0}
 * 
 */


import LocalizedStrings from 'react-localization'
import messages from './messages.json'
import texts from './texts.json'

//handle string localization. (the others TBD. e.g. date, currency )
export const STRINGS={
  messages: new LocalizedStrings(messages),
  texts: new LocalizedStrings(texts),
  setLanguage: function(language){
    this.messages.setLanguage(language)
    this.texts.setLanguage(language)
  }
}
STRINGS.setLanguage('en')

export const TEXT_HOME='home'
export const TEXT_LOGIN='login'
export const TEXT_LOGOUT='logout'
export const TEXT_ABOUT='about'
export const TEXT_LANGUAGE='language'
export const TEXT_ENGLISH='english'
export const TEXT_SIMPLE_CHINESE='simpleChinese'
export const TEXT_USERNAME='username'
export const TEXT_PASSWORD='password'
export const TEXT_CREATE='create'
export const TEXT_UPDATE='update'
export const TEXT_SEARCH='search'
export const TEXT_SAVE='save'
export const TEXT_SHARE='share'

export const MESSAGE_INVALID_USERNAME='invalidUsername'
export const MESSAGE_INVALID_PASSWORD='invalidPassword'
export const MESSAGE_INVALID_LOGIN='invalidLogin'
