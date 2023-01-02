export const fin = {
  name: "Finnish",
  main: {
    months: [
      "Tammikuu",
      "Helmikuu",
      "Maaliskuu",
      "Huhtikuu",
      "Toukokuu",
      "Kesäkuu",
      "Heinäkuu",
      "Elokuu",
      "Syyskuu",
      "Lokakuu",
      "Marraskuu",
      "Joulukuu",
    ],
    lang_select: "Valitse kieli",
    landingpage: {
      register: "Luo tili",
      login: "Kirjaudu sisään",
    },
    confirm: {
      is_required: "Vahvistuskoodi on pakollinen",
      title: "Vahvista rekisteröinti",
      code: "Vahvistuskoodi",
      confirm: "Vahvista",
      confirming: "Vahvistetaan...",
    },
    register: {
      title: "Luo tili",
      first_name: "Etunimi",
      last_name: "Sukunimi",
      citizenship: "Kansalaisuus",
      email: "Sähköposti",
      phone_number: "Puhelinnumero",
      password: "Salasana",
      password_confirmation: "Vahvista salasana",
      agree: "Hyväksyn käyttöehdot",
      register: "Luo tili",
      date_of_birth: "Syntymäaika",
      errors: {
        email_already_exists: "Sähköposti on jo käytössä",
        phone_number: {
          is_too_long: "Puhelinnumero on liian pitkä",
          is_too_short: "Puhelinnumero on liian lyhyt",
          is_required: "Puhelinnumero on pakollinen",
          is_invalid: "Puhelinnumero on virheellinen",
        },
        invalid_email: "Sähköposti on virheellinen",
        email_is_required: "Sähköposti on pakollinen",
        last_name: {
          is_required: "Sukunimi on pakollinen",
          is_too_short: "Sukunimi on liian lyhyt",
          is_too_long: "Sukunimi on liian pitkä",
        },
        first_name: {
          is_required: "Etunimi on pakollinen",
          is_too_short: "Etunimi on liian lyhyt",
          is_too_long: "Etunimi on liian pitkä",
        },
        password: {
          is_required: "Salasana on pakollinen",
          is_too_short: "Salasana on liian lyhyt",
          is_too_long: "Salasana on liian pitkä",
        },
        password_confirmation: {
          is_required: "Salasanan vahvistus on pakollinen",
          is_too_short: "Salasanan vahvistus on liian lyhyt",
          is_too_long: "Salasanan vahvistus on liian pitkä",
          does_not_match: "Salasana ja vahvistus eivät täsmää",
        },
      },
    },
    login: {
      title: "Kirjaudu sisään Valpas NextAppiin",
      email: "Sähköposti",
      password: "Salasana",
      login: "Kirjaudu sisään",
      logging_in: "Kirjaudutaan sisään...",
      forgot_password: "Unohditko salasanasi?",
      register: "Luo tili",
      errors: {
        invalid_email: "Sähköposti on virheellinen",
        email_is_required: "Sähköposti on pakollinen",
        password_is_required: "Salasana on pakollinen",
      },
    },
    forgot_password: {
      title: "Unohditko salasanasi?",
      form_title: "Uusi salasana",
      email: "Sähköposti",
      code: "Vahvistuskoodi",
      password: "Salasana",
      password_confirmation: "Vahvista salasana",
      change_password: "Vaihda salasana",
      changing_password: "Vaihdetaan salasanaa...",
      send: "Lähetä",
      sending: "Lähetetään...",
      have_code: "Oletko jo saanut vahvistuskoodin?",
      errors: {
        invalid_email: "Sähköposti on virheellinen",
        email_is_required: "Sähköposti on pakollinen",
        code_is_too_long: "Vahvistuskoodi on liian pitkä",
        password_is_too_long: "Salasana on liian pitkä",
        password_is_too_short: "Salasana on liian lyhyt",
        password_is_required: "Salasana on pakollinen",
        code_is_required: "Vahvistuskoodi on pakollinen",
        confirmation_code_does_not_match: "Vahvistuskoodi ei täsmää",
        confirmation_code_is_required: "Vahvistuskoodi on pakollinen",
      },
    },
    reset_password: {
      title: "Uusi salasana",
      reset_code: "Vahvistuskoodi",
      password: "Salasana",
      confirm_password: "Vahvista salasana",
      reset: "Vaihda salasana",
    },
    sidebar: {
      home: "Kotisivu",
      track: "Seuranta",
      project: "Projekti",
      analyze: "Analysoi",
      reports: "Raportit",
      team: "Tiimi",
      admin_panel: "Ylläpitäjä",
      projects: "Projektit",
      workers: "Työntekijät",
      workplaces: "Työpaikat",
      history: "Historia",
    },
    track: {
      recorder: {
        tabs: {
          timer: "Ajastin",
          manual: "Manuaalinen",
        },
        timer: {
          description: "Kuvaus",
          workplace: "Asiakas",
          workitem: "Työkohde",
          start: "Aloita",
          stop: "Lopeta",
          edit_start: {
            title: "Muokkaa aloitusaikaa",
            start_time: "Aloitusaika",
            save: "Tallenna",
            cancel: "Peruuta",
          },
        },
        manual: {
          description: "Kuvaus",
          workplace: "Asiakas",
          workitem: "Työkohde",
          date: "Päivämäärä",
          start_time: "Aloitusaika",
          end_time: "Lopetusaika",
          create: "Luo",
        },
      },
      history: {
        week: "Viikko",
        total_time: "Yhteensä",
        none_description: "Ei kuvausta",
        date: "Päivämäärä",
        workplace: "Näytä",
        all: "Kaikki",
        workitem: "Työkohde",
        no_work: "Kohdetta ei valittu",
        sent: "Lähetetty",
        confirmed: "Vahvistettu",
        add_description: "Lisää kuvaus",
        title: {
          this_week: "Tämä viikko",
          select_workplace: "Valitse toimipiste",
          history: "Historia",
          none_times: "Ei aikoja",
          not_confirmed: "Ei vahvistettu",
          deleteTitle: "Oletko varma että haluat poistaa tämän ajan?",
          deleteAlert: "Tätä toimintoa ei voi perua",
        },

        breaks: {
          lunch: "Lounas 30 min",
          lunch_l: "Lounas muu kesto",
          short: "Tauko 15 min",
          long: "Tauko 30 min",
          going: "Oma asiointi",
          accident: "Tapaturma",
        },

        buttons: {
          report: "Raportoi",
          delete: "Poista",
          dublicate: "Kopioi",
          save: "Tallenna",
          send: "Lähetä",
          cancelsend: "Peruuta lähetys",
          reportweek: "Raportoi viikko",
          cancel: "Peruuta",
        },
      },
    },
    reports: {
      title: "Raportit",
      workplace: "Työpaikka",
      worker: "Työntekijä",
      week: "Viikko",
      total_hours: "Yhteensä",
      none_description: "Ei kuvausta",
      confirm: "Vahvista",
      unconfirm: "Peruuta vahvistus",
      alert: {
        title: "Vahvistus",
        message: "Haluatko vahvistaa raportin?",
        confirm: "Vahvista",
        cancel: "Peruuta",
      },
    },
    workplaces: {
      title: "Työpaikat",
      create_workplace: "Luo työpaikka",
      worker_name: "Työntekijän nimi",
      work_name: "Työkohden nimi",
      add_work: "Lisää työtehtävä",
      name: "Nimi",
      description: "Työtehtävän kuvaus",
      create_work: {
        title: "Luo työ",
        name: "Nimi",
        create: "Luo",
        cancel: "Peruuta",
        errors: {
          is_too_short: "Nimi on liian lyhyt",
          is_too_long: "Nimi on liian pitkä",
          is_required: "Nimi on pakollinen",
        },
      },
      alert_work: {
        min_name: "Nimi pitää olla vähintään 3 merkkiä pitkä",
        max_name: "Nimi voi olla enintään 35 merkkiä pitkä",
        required_name: "Nimi on pakollinen",
        min_description: "Kuvaus pitää olla vähintään 3 merkkiä pitkä",
        max_description: "Kuvaus voi olla enintään 50 merkkiä pitkä",
        required_description: "Kuvaus on pakollinen",
      },
      allert_workplace: {
        title: "Vahvistus poistosta",
        message: "Haluatko varmasti poistaa työpaikan",
        confirm: "Vahvista",
        cancel: "Peruuta",
      },
      allert_worker: {
        title: "Vahvistus poistosta",
        message: "Haluatko varmasti poistaa työntekijän",
        message2: ":sta",
        confirm: "Vahvista",
        cancel: "Peruuta",
      },
      add_user: {
        title: "Lisää työntekijä",
        email: "Sähköposti",
        add: "Lisää",
        cancel: "Peruuta",
        errors: {
          invalid_email: "Sähköposti on virheellinen",
          email_is_required: "Sähköposti on pakollinen",
        },
      },
      setting: {
        delete: {
          title: "Poista työpaikka",
          message: "Haluatko varmasti poistaa työpaikan",
        },
        buttons: {
          delete: "Poista",
          settings: "Asetukset",
          cancel: "Peruuta",
          agree: "Hyväksy",
        },
      },
    },
  },
};
