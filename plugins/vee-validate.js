import { configure, defineRule } from 'vee-validate';
import { required, numeric, email, url } from '@vee-validate/rules';

export default defineNuxtPlugin(() => {
  defineRule('required', required);
  defineRule('numeric', numeric);
  defineRule('email', email);
  defineRule('url', url);

  configure({
    generateMessage: (ctx) => {
      const messages = {
        required: `The field ${ctx.field} is required.`,
        numeric: `The field ${ctx.field} must be a numeric value.`
      };
      return messages[ctx.rule.name] || `The field ${ctx.field} is invalid.`;
    }
  });
  
});

