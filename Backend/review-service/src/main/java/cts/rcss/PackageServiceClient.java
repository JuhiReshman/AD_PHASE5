package cts.rcss;

import cts.rcss.model.PackageDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "PACKAGE-SERVICE")
public interface PackageServiceClient {

    @GetMapping("/api/packages/{packageId}")
    PackageDTO getPackageById(@PathVariable("packageId") Long packageId);
}
