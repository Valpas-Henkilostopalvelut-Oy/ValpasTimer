export const ukr = {
  name: "Українська",
  main: {
    service: {
      breaks: {
        lunch: "Обід 30 хв",
        lunch_l: "Обід",
        short: "Короткий перерва 15 хв",
        long: "Довгий перерва 30 хв",
        going: "Виїзд",
        accident: "Аварія",
      },
      methodselect: {
        cash: "Готівка",
        card: "Карта",
        companycard: "Карта компанії",
        transfer: "Переказ",
        other: "Інше",
      },
      classes: {
        administrativeservice: "Адміністративні послуги",
        itdeviceandsoftwareexpenses: "IT-пристрої та програмне забезпечення",
        marketingexpenses: "Маркетингові витрати",
        meetingexpenses: "Витрати на зустрічі",
        premisesexpenses: "Витрати на приміщення",
        travelexpenses: "Витрати на подорожі",
        vehicleexpenses: "Витрати на транспорт",
      },
    },
    months: [
      "Січень",
      "Лютий",
      "Березень",
      "Квітень",
      "Травень",
      "Червень",
      "Липень",
      "Серпень",
      "Вересень",
      "Жовтень",
      "Листопад",
      "Грудень",
    ],
    lang_select: "Виберіть мову",
    landingpage: {
      register: "Зареєструватися",
      login: "Увійти",
    },
    confirm: {
      is_required: "Код підтвердження є обов'язковим",
      title: "Підтвердіть реєстрацію",
      code: "Код підтвердження",
      confirm: "Підтвердити",
      confirming: "Підтвердження...",
    },
    profile: {
      title: "Профіль",
      details: {
        details: "Деталі",
        name: "Ім'я",
        email: "Електронна пошта",
        phone: "Номер телефону",
        idnumber: "Ідентифікаційний номер",
        iban: "IBAN",
        city: "Місто",
        birthdate: "Дата народження",
        nationality: "Громадянство",
      },
      cards: {
        add: "Додати картку",
        close: "Закрити",
        cards: "Картки",
        cardtype: "Тип картки",
        cardend: "Кінець картки",
        cardimage: "Зображення картки",
        uploadcard: "Завантажити картку",
        uploadcardinfo: "Завантажте зображення картки",
        download: "Завантажити",
        delete: "Видалити",
        category: "Категорія",
        owncar: "Власний автомобіль",
        types: {
          id: "ID",
          driving: "Водійське посвідчення",
          passport: "Паспорт",
          workcard: "Робоча картка",
          hygienepass: "Гігієнічний пропуск",
          worksafetypass: "Пропуск на робоче місце",
          fireworkcard: "Картка пожежника",
          electricalsafetypass: "Електробезпека",
          other: "Інше",
        },
      },
    },
    register: {
      title: "Реєстрація",
      first_name: "Ім'я",
      last_name: "Прізвище",
      citizenship: "Громадянство",
      email: "Електронна пошта",
      phone_number: "Номер телефону",
      password: "Пароль",
      password_confirmation: "Підтвердження паролю",
      agree: "Я згоден з умовами користування",
      register: "Зареєструватися",
      date_of_birth: "Дата народження",
      errors: {
        email_already_exists: "Цей електронний адресс вже зареєстрований",
        phone_number: {
          is_too_long: "Номер телефону занадто довгий",
          is_too_short: "Номер телефону занадто короткий",
          is_required: "Номер телефону є обов'язковим",
          is_invalid: "Номер телефону є невірним",
        },
        invalid_email: "Невірний електронний адресс",
        email_is_required: "Електронний адресс є обов'язковим",
        last_name: {
          is_required: "Прізвище є обов'язковим",
          is_too_short: "Прізвище занадто коротке",
          is_too_long: "Прізвище занадто довге",
        },
        first_name: {
          is_required: "Ім'я є обов'язковим",
          is_too_short: "Ім'я занадто коротке",
          is_too_long: "Ім'я занадто довге",
        },
        password: {
          is_required: "Пароль є обов'язковим",
          is_too_short: "Пароль занадто короткий",
          is_too_long: "Пароль занадто довгий",
        },
        password_confirmation: {
          is_required: "Підтвердження паролю є обов'язковим",
          is_too_short: "Підтвердження паролю занадто коротке",
          is_too_long: "Підтвердження паролю занадто довге",
          does_not_match: "Паролі не співпадають",
        },
      },
    },
    login: {
      title: "Вхід",
      email: "Електронна пошта",
      password: "Пароль",
      login: "Увійти",
      logging_in: "Вхід",
      forgot_password: "Забули пароль?",
      register: "Зареєструватися",
      errors: {
        invalid_email: "Невірний електронний адресс",
        email_is_required: "Електронний адресс є обов'язковим",
        password_is_required: "Пароль є обов'язковим",
      },
    },
    forgot_password: {
      title: "Забули пароль?",
      form_title: "Відновлення паролю",
      email: "Електронна пошта",
      code: "Код",
      password: "Пароль",
      password_confirmation: "Підтвердження паролю",
      change_password: "Змінити пароль",
      changing_password: "Зміна паролю",
      send: "Надіслати код",
      sending: "Надсилання коду",
      have_code: "Вже маєте код?",
      errors: {
        invalid_email: "Невірний електронний адресс",
        email_is_required: "Електронний адресс є обов'язковим",
        code_is_too_long: "Код занадто довгий",
        password_is_too_long: "Пароль занадто довгий",
        password_is_too_short: "Пароль занадто короткий",
        password_is_required: "Пароль є обов'язковим",
        code_is_required: "Код є обов'язковим",
        confirmation_code_does_not_match: "Код не співпадає",
        confirmation_code_is_required: "Код є обов'язковим",
      },
    },
    reset_password: {
      title: "Reset Password",
      reset_code: "Reset Code",
      password: "Password",
      confirm_password: "Confirm Password",
      reset: "Reset Password",
    },
    sidebar: {
      home: "Домашня",
      track: "Трекер",
      project: "Проект",
      analyze: "Аналіз",
      reports: "Звіти",
      receipts: "Рахунки",
      team: "Команда",
      admin_panel: "Адмін панель",
      projects: "Проекти",
      workers: "Робітники",
      workplaces: "Місця роботи",
      history: "Історія",
      library: "Зарплата",
    },
    track: {
      recorder: {
        tabs: {
          timer: "Таймер",
          manual: "Ручний",
        },
        timer: {
          description: "Опис",
          workplace: "Місце роботи",
          start: "Старт",
          stop: "Стоп",
          edit_start: {
            title: "Редагувати початок",
            start_time: "Час початку",
            save: "Зберегти",
            cancel: "Скасувати",
          },
        },
        manual: {
          description: "Опис",
          workplace: "Місце роботи",
          date: "Дата",
          start_time: "Час початку",
          end_time: "Час закінчення",
          create: "Створити",
        },
      },
      history: {
        week: "Тиждень",
        total_time: "Загальний час",
        none_description: "Без опису",
        date: "Дата",
        workplace: "Місце роботи",
        all: "Всі",
        sent: "Відправлено",
        confirmed: "Підтверджено",
        add_description: "Додати опис",
        title: {
          this_week: "Цей тиждень",
          select_workplace: "Виберіть місце роботи",
          history: "Історія",
          none_times: "Немає записів",
          not_confirmed: "Не підтверджено",
          deleteTitle: "Ви дійсно хочете видалити цей запис?",
          deleteAlert: "Ви не зможете відновити цей запис!",
        },

        buttons: {
          report: "Підтвердити",
          delete: "Видалити",
          dublicate: "Дублювати",
          save: "Зберегти",
          cancel: "Скасувати",
          send: "Відправити",
          cancelsend: "Скасувати відправку",
          reportweek: "Підтвердити тиждень",
        },
      },
    },
    reports: {
      title: "Звіти",
      workplace: "Місце роботи",
      worker: "Робітник",
      week: "Тиждень",
      total_hours: "Загальний час",
      none_description: "Без опису",
      confirm: "Підтвердити",
      unconfirm: "Скасувати підтвердження",
      sent: "Відправлено",
      confirmed: "Підтверджено",
      alert: {
        title: "Підтвердити записи",
        message: "Ви дійсно хочете підтвердити всі записи за цей тиждень?",
        confirm: "Підтвердити",
        cancel: "Скасувати",
      },
      buttons: {
        weekreport: "Звіт за тиждень",
      },
    },
    workplaces: {
      title: "Місця роботи",
      create_workplace: "Створити місце роботи",
      worker_name: "Ім'я робітника",
      work_name: "Назва місця роботи",
      add_work: "Додати місце роботи",
      email: "Електронна пошта",
      create_work: {
        title: "Створити місце роботи",
        name: "Назва місця роботи",
        create: "Створити",
        cancel: "Скасувати",
        errors: {
          is_too_short: "Назва занадто коротка",
          is_too_long: "Назва занадто довга",
          is_required: "Назва обов'язкова",
        },
      },
      alert_work: {
        min_name: "Назва має бути не менше 3 символів",
        max_name: "Назва може бути не більше 20 символів",
        required_name: "Назва обов'язкова",
        min_description: "Опис має бути не менше 3 символів",
        max_description: "Опис може бути не більше 20 символів",
        required_description: "Опис обов'язковий",
      },
      allert_workplace: {
        title: "Підтвердити видалення місця роботи",
        message: "Ви дійсно хочете видалити",
        confirm: "Підтвердити",
        cancel: "Скасувати",
      },
      allert_worker: {
        title: "Підтвердити видалення робітника",
        message: "Ви дійсно хочете видалити",
        message2: "з",
        confirm: "Підтвердити",
        cancel: "Скасувати",
      },
      add_user: {
        title: "Додати робітника",
        email: "Електронна пошта",
        add: "Додати",
        cancel: "Скасувати",
        errors: {
          invalid_email: "Неправильна електронна пошта",
          email_is_required: "Електронна пошта обов'язкова",
        },
      },
      setting: {
        delete: {
          title: "Підтвердити видалення",
          message: "Ви дійсно хочете видалити",
        },
        buttons: {
          delete: "Видалити",
          settings: "Налаштування",
          cancel: "Скасувати",
          agree: "Погодитися",
        },
      },
    },
    receipts: {
      title: "Квитки",
      titlelist: "Список квитків",
      buttons: {
        filter: "Фільтр",
        add: "Додати",
        cancel: "Скасувати",
        receipt: "Квиток",
        travel: "Подорож",
      },
      addreceipt: {
        title: "Додати квиток",
        date: "Дата",
        number: "Номер квитка",
        amount: "Сума",
        currency: "Валюта",
        place: "Місце",
        tax: "Податок",
        method: "Метод",
        category: "Категорія",
        comment: "Коментар",
        attachments: "Вкладення",
        class: "Клас",
        carousel: {
          title: "Вкладення",
          buttons: {
            remove: "Видалити",
            add: "Додати",
          },
        },
        buttons: {
          add: "Додати",
          cancel: "Скасувати",
          upload: "Завантажити",
        },
      },

      list: {
        title: "Список квитків",
        buttons: {
          show: "Показати",
        },
      },
    },
  },
};
