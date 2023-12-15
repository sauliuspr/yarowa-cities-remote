type City = {
    displayName: string;
    sfSingleNode: boolean;
    sfDiskSku: string;
    azureUrls: AzureUrls;
    eventsAdminStrategy: string;
    postFix: string;
    hasBarcodeLicence: boolean;
    url: string;
    sfVersion: string;
    sfVmMemory: number;
    short5: string;
    miraGatewayStrategy: string;
    adminStrategy: AdminStrategy;
    domain: string;
    env: string;
    size: string;
    pooling: boolean;
    ipPrefix: string;
    usePrivateLinks: UsePrivateLinks;
    sfRealClusterSize: number;
    reportingStrategy: ReportingStrategy;
    sfUpgradeMode: string;
    sfCustomFeatures: string;
    agentDeployed: string;
    customFeatures: string;
    sfLoadBalancerIpAddressSku: string;
    lbIpSku: string;
    sfVmCPU: number;
    key: string;
    cdnMicrosoftStorageUrl: string;
    sfDeployed: string;
    cdnPrivateStorageUrl: string;
    webAppLocation: string;
    cdnUrl: string;
    sfClusterSize: number;
    index: number;
    continent: string;
    webAppSku: string;
    certificateStrategy: CertificateStrategy;
    vmssUpgradePolicy: string;
    cdnInternalStorageUrl: string;
    webUrl: string;
    cdnCnameDomain: string;
    cdnDomain: string;
    sfClusterCodeVersion: string;
    cdnStorageUrl: string;
    webAppConnectionStrategy: WebAppConnectionStrategy;
    registeredRegions: RegisteredRegions;
    sfVmType: string;
    cdnInternetStorageUrl: string;
    businessUnit: string;
    sfReliabilityLevel: string;
    onlineDiagnostics: CityDetails;
    lastDiagnostics: CityDetails;
  }
  
  type AzureUrls = {
    cdnStorageUrl: string;
    vmss: string;
    appInsights: string;
  }
  
  type AdminStrategy = {
    events: string;
  }
  
  type UsePrivateLinks = {
    web: boolean;
    cdn: boolean;
  }
  
  type ReportingStrategy = {
    uk: string;
    de: string;
    at: string;
    ch: string;
    it: string;
  }
  
  type CertificateStrategy = {
    internalServices: string;
    tokenSigning: string;
    integrationDataEncipherment: string;
    transportSettings: string;
    admin: string;
    primary: string;
    proxy: string;
    samlSigning: string;
    dataEncipherment: string;
    secondary: string;
  }
  
  type WebAppConnectionStrategy = {
    at: string;
    ch: string;
    de: string;
    it: string;
    uk: string;
    default: string;
  }
  
  type RegisteredRegions = {
    list: RegionDomainPair[];
    webFqdn: string;
    switzerlandnorth: RegionDomainMap;
    germanywestcentral: RegionDomainMap;
    version: string;
    uksouth: RegionDomainMap;
  }
  
  type RegionDomainPair = {
    domain: string;
    region: string;
  }
  
  type RegionDomainMap = {
    [key: string]: {
      domain: string[];
    };
  }
  

  type CityDetails = {
    status: string;
    continent: string;
    postFix: string;
    businessUnit: string;
    regions: Region[];
    color: string;
    city: string;
};

type Region = {
    frontend: Frontend;
    nodeSize: number;
    businessUnit: string;
    status: string;
    domain: string;
    statusColor: string;
    XVersion: XVersion;
    region: string;
    city: string;
    backend: Backend;
    country: string;
    postFix: string;
    vmMemory: number;
    continent: string;
    displayName: string;
    vmCPU: number;
};

type Frontend = {
    status: string;
    config: Config;
    error: string;
    applicationVersion: string;
    deployedAt: string;
    codeVersion: string;
    codeLastCommit: string;
    url: string;
};

type Backend = {
    status: string;
    config: Config;
    error: string;
    applicationVersion: string;
    deployedAt: string;
    codeVersion: string;
    codeLastCommit: string;
    url: string;
};

type Config = {
    country: string;
    codeLastCommit: string;
    status: string;
    applicationVersion: string;
    url: string;
    codeVersion: string;
    error?: string;
    region?: string;
    deployedAt?: string;
    deployedStatus?: string;
};

type XVersion = {
    statusColor: string;
    root: Diagnostic;
    configStatic: Diagnostic;
    status: string;
    api: API;
};

type Diagnostic = {
    diagnostics: string;
    status: string;
    header: string;
};

type API = {
    frontend: Diagnostic;
    config: Diagnostic;
    backend: Diagnostic;
};
