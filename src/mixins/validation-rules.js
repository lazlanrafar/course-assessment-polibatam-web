const validationRules = {
  data() {
    return {
      genericRequiredRule: (value, msg) => !!value || `${msg} harus diisi`,
    };
  },
};

export default validationRules;
