'use client';

import Text from '@/components/Text';
import styles from './page.module.scss';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  },
} as const;

const AboutPage = () => {
  return (
    <motion.main
      className={styles['about-page']}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className={styles['about-page__container']}>
        <motion.div
          className={styles['about-page__title']}
          variants={itemVariants}
        >
          <Text
            view="title"
            tag="h1"
            className={styles['about-page__title-name']}
          >
            About us
          </Text>
          <Text view="p-20" color="secondary">
            We are Lalasia — a place where thoughtful design meets everyday
            comfort. Our curated collection of furniture and home decor helps
            you create spaces that truly feel like home.
          </Text>
        </motion.div>

        <motion.div
          className={styles['about-page__feature']}
          variants={itemVariants}
        >
          <div className={styles['about-page__feature-card']}>
            <div className={styles['about-page__feature-icon']}>
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 3L20.09 11.26L29 12.55L22.5 18.88L24.18 27.75L16 23.44L7.82 27.75L9.5 18.88L3 12.55L11.91 11.26L16 3Z"
                  stroke="#518581"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <Text view="p-18" weight="bold" tag="h3">
              Premium Quality
            </Text>
            <Text view="p-16" color="secondary">
              Every item in our catalogue is carefully selected for durability,
              craftsmanship, and lasting style.
            </Text>
          </div>

          <div className={styles['about-page__feature-card']}>
            <div className={styles['about-page__feature-icon']}>
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="16"
                  cy="16"
                  r="13"
                  stroke="#518581"
                  strokeWidth="1.8"
                />
                <path
                  d="M10 16l4 4 8-8"
                  stroke="#518581"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <Text view="p-18" weight="bold" tag="h3">
              Trusted by Thousands
            </Text>
            <Text view="p-16" color="secondary">
              Over 12 000 happy customers have transformed their homes with
              products from Lalasia.
            </Text>
          </div>

          <div className={styles['about-page__feature-card']}>
            <div className={styles['about-page__feature-icon']}>
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 16h22M5 10h22M5 22h14"
                  stroke="#518581"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <Text view="p-18" weight="bold" tag="h3">
              Easy Shopping
            </Text>
            <Text view="p-16" color="secondary">
              Browse, filter by category, save favourites and check out in just
              a few clicks — shopping should be effortless.
            </Text>
          </div>
        </motion.div>

        <motion.div
          className={styles['about-page__stats']}
          variants={itemVariants}
        >
          <div className={styles['about-page__stat']}>
            <Text view="title" color="accent">
              500+
            </Text>
            <Text view="p-16" color="secondary">
              Products
            </Text>
          </div>
          <div className={styles['about-page__stat']}>
            <Text view="title" color="accent">
              12k+
            </Text>
            <Text view="p-16" color="secondary">
              Happy customers
            </Text>
          </div>
          <div className={styles['about-page__stat']}>
            <Text view="title" color="accent">
              50+
            </Text>
            <Text view="p-16" color="secondary">
              Brands
            </Text>
          </div>
          <div className={styles['about-page__stat']}>
            <Text view="title" color="accent">
              4.9
            </Text>
            <Text view="p-16" color="secondary">
              Average rating
            </Text>
          </div>
        </motion.div>

        {/* Mission */}
        <motion.div
          className={styles['about-page__mission']}
          variants={itemVariants}
        >
          <Text
            view="p-18"
            weight="bold"
            tag="h2"
            className={styles['about-page__mission-title']}
          >
            Our Mission
          </Text>
          <Text view="p-20" color="secondary">
            We believe a well-designed home has the power to improve your daily
            life. That&apos;s why we partner with independent designers and
            trusted manufacturers to bring you pieces that balance beauty and
            function — at prices that make good design accessible to everyone.
          </Text>
        </motion.div>
      </div>
    </motion.main>
  );
};

export default AboutPage;
