import { useQuery, NetworkStatus } from "@apollo/client";
import { Spin } from "antd";
import { Basic, Combined, Animated, bounce } from "../shared/styles";
import { initializeApollo } from "../lib/apolloClient";
import { PRODUCT_CATEGORY_QUERY } from "../api/queries";

const Home = () => {
  const { loading, error, data } = useQuery(PRODUCT_CATEGORY_QUERY, {
    variables: { categories: "fasteners" },
    // Setting this value to true will make the component rerender when
    // the "networkStatus" changes, so we are able to know if it is fetching
    // more data
    // notifyOnNetworkStatusChange: true,
  });

  console.log(data);
  console.log(error);

  return (
    <Spin spinning={loading}>
      <Basic>Cool Styles</Basic>
      <Combined>
        With <code>:hover</code>.
      </Combined>
      <Animated animation={bounce}>Let's bounce.</Animated>
    </Spin>
  );
};

// export async function getStaticProps() {
//   const apolloClient = initializeApollo();

//   const { loading, data } = await apolloClient.query({
//     query: PRODUCT_CATEGORY_QUERY,
//     variables: { categories: "fasteners" },
//   });

//   return {
//     props: {
//       loading,
//       data,
//     },
//     revalidate: 1,
//   };
// }

export default Home;
